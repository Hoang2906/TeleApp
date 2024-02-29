import 'reflect-metadata'
import {DataSource} from 'typeorm'
import {UserModel} from "../entity/UserModel";
import {Conversation} from "../entity/Conversation";
import {Message} from "../entity/Message";
import {ReadMessage} from "../entity/ReadMessage";

export const AppDataSource = new DataSource({
  type: process.env.TYPEORM_TYPE as any,
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
  logging: process.env.TYPEORM_LOGGING as any,
  entities: [UserModel, Conversation, Message, ReadMessage],
  migrations: [],
  subscribers: []
})
export const initializeDatabase = async function () {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
      console.log('Database connection initialized')
    }
  } catch (error) {
    console.log(error)
  }
}
