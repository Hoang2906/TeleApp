import {Router} from "express";
import {UserModel} from "../entity/UserModel";
import {AppDataSource} from "../services/dbService";
import {Conversation} from "../entity/Conversation";
import {makeError, makeSuccess} from "../utils/BaseResponse";
import {Message} from "../entity/Message";
import {body, query, validationResult} from "express-validator";
import AppUtils, {tryParseInt} from "../utils/AppUtils";
import Pusher from "../services/pusher";

const router = Router()
const userRepository = AppDataSource.getRepository(UserModel)
const conversationRepository = AppDataSource.getRepository(Conversation)
const messageRepository = AppDataSource.getRepository(Message)

function areAllItemsIncluded<T>(arr1: T[], arr2: T[]): boolean {
  return arr1.every(item => arr2.includes(item));
}

router.post("/create-conversation", async (req, res) => {
  async function checkDuplicationConversation(users: UserModel[]): Promise<Conversation | undefined> {
    const all = await conversationRepository.find({
      relations: {
        users: true
      }
    })

    for (let i = 0; i < all.length; i++) {
      const item = all[i]
      const userIds = item.users.map(_item => _item.id)

      console.log("dzung",users, item.users)

      const isDup: boolean = areAllItemsIncluded(users.map(i => i.id), userIds);
      if (isDup) {
        return item
      }
    }
    return undefined;
  }

  try {
    const currentUser: UserModel = req.body["performer"]
    const toUserId: number = req.body['toUserId']

    const user1 = await userRepository.findOne({
      where: {id: currentUser.id}
    })

    const user2 = await userRepository.findOne({
      where: {id: toUserId}
    })

    if (user1 && user2) {
      const dupConversation = await checkDuplicationConversation([user1, user2])

      if (dupConversation) {
        return makeError(res, 404, `Already have one! ${dupConversation.id}`)
      }

      const conversation = await conversationRepository.save({
        users: [user1, user2]
      })

      await Pusher.trigger(
        [`user-${user1.id}`, `user-${user2.id}`],
        "conversation-created",
        {
          conversation
        },
      )

      makeSuccess(res, conversation)
    } else {
      makeError(res, 404, `User not found!`)
    }
  } catch (e) {
    //@ts-ignore
    makeError(res, 500, e.toString())
  }
})

router.post(
  "/send",
  body("content").notEmpty(),
  body("conversationId").notEmpty(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return makeError(res, 404, AppUtils.getValidateError(errors))
      }

      const user: UserModel = req.body["performer"]
      const content = req.body["content"]
      const conversationId = req.body["conversationId"]

      const conversation = await conversationRepository.findOne({
        where: {
          id: conversationId
        },
        relations: {
          users: true
        }
      })

      if (conversation == null) {
        return makeError(res, 404, "Conversation is not created yet!")
      }

      const isParticipant = conversation.users.some((_user) => _user.id === user.id);

      if (!isParticipant) {
        return makeError(res, 404, "You're not a participant")
      }

      const result = await messageRepository.save({
        content,
        conversation,
        sender: user
      })

      await Pusher.trigger(
        [`conversation-${conversation.id}`],
        "message-sent",
        {
          result
        },
      )

      return makeSuccess(res, result)
    } catch (e) {
      makeError(res, 404, (e as any).toString())
    }
  },
)


router.get(
  "/list-message",
  query("conversationId").notEmpty(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty() || !req.query) {
        return makeError(res, 404, AppUtils.getValidateError(errors))
      }

      const user: UserModel = req.body["performer"]
      const conversationId = req.query["conversationId"]

      const conversation = await conversationRepository.findOne({
        where: {
          id: conversationId,
        },
        relations: {
          messages: {
            sender: true,
          },
          users: true,
        },
        order: {
          messages: {
            createdAt: "DESC"
          }
        }
      })

      if (conversation == null) {
        return makeError(res, 404, "Conversation is not created yet!")
      }

      const isParticipant = conversation.users.some((_user) => _user.id === user.id);

      if (!isParticipant) {
        return makeError(res, 404, "You're not a participant")
      }

      const page = req.query ? tryParseInt(req.query["page"], 0) : 0
      const perPage = req.query ? tryParseInt(req.query["per_page"], 5) : 5

      const startIndex = page * perPage

      const pagingData = conversation.messages.slice(startIndex, startIndex + perPage)
      return makeSuccess(res, pagingData)
    } catch (e) {
      makeError(res, 404, (e as any).toString())
    }
  },
)


router.get(
  "/list-chat",
  async (req, res) => {

    const currentUser: UserModel = req.body["performer"]

    const user = await userRepository.findOne({
      where: {
        id: currentUser.id
      },
      relations: {
        conversations: {
          users: true,
          messages: true,
        },
      },
    })

    if (user == null) {
      return makeError(res, 404, "Conversation is not created!")
    }

    const convers = user.conversations
    const result = convers.map((conver) => {
      let last_message
      if (conver.messages) {
        last_message = conver.messages.slice(-1)[0]
      }

      let item: Partial<Conversation> & {
        last_message: Message|undefined
      } = {
        ...conver,
        last_message
      }
      delete item['messages']

      return item
    })

    return makeSuccess(res, result)
  },
)

export default router
