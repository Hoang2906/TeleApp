import {Entity, JoinTable, ManyToMany, ManyToOne, OneToMany} from "typeorm"
import BaseEntity from "./BaseEntity";
import {Message} from "./Message";
import {UserModel} from "./UserModel";

@Entity()
export class Conversation extends BaseEntity {
  @OneToMany(() => Message, (model) => model.conversation)
  messages: Message[]

  @ManyToMany(() => UserModel, (model) => model.conversations)
  @JoinTable({
    name: "participants"
  })
  users: UserModel[]
}