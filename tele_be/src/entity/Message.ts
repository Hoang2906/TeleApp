import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm"
import BaseEntity from "./BaseEntity";
import {Conversation} from "./Conversation";
import {UserModel} from "./UserModel";
import {ReadMessage} from "./ReadMessage";

@Entity()
export class Message extends BaseEntity {
  @Column()
  content: string

  @ManyToOne(() => Conversation, (model) => model.messages)
  conversation: Conversation

  @ManyToOne(() => UserModel, (model) => model.messages)
  sender: UserModel

  @OneToMany(() => ReadMessage, (model) => model.message)
  reads: ReadMessage[]
}