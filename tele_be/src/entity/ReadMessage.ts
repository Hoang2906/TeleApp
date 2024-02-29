import {Entity, ManyToOne} from "typeorm"
import BaseEntity from "./BaseEntity";
import {Message} from "./Message";
import {UserModel} from "./UserModel";

@Entity()
export class ReadMessage extends BaseEntity {
  @ManyToOne(() => Message, (model) => model.reads)
  message: Message

  @ManyToOne(() => UserModel, (model) => model.reads)
  user: UserModel
}