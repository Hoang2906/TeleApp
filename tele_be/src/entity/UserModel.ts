import {Column, Entity, ManyToMany, OneToMany} from "typeorm"
import BaseEntity from "./BaseEntity";
import {Message} from "./Message";
import {Conversation} from "./Conversation";
import {ReadMessage} from "./ReadMessage";

@Entity()
export class UserModel extends BaseEntity {
  @Column({nullable: false, unique: true})
  phone_number: string

  @Column({nullable: false})
  full_name: string

  @Column()
  password: string

  @Column()
  avatar: string

  @OneToMany(() => Message, (model) => model.sender)
  messages: Message[]

  @ManyToMany(() => Conversation, (model) => model.users)
  conversations: Conversation[]

  @OneToMany(() => ReadMessage, (model) => model.user)
  reads: ReadMessage[]
}