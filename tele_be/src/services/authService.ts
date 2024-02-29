import {NextFunction, Request, Response} from 'express'
import jsonwebtoken, {sign} from 'jsonwebtoken'
import {AppDataSource} from './dbService'
import {UserModel} from "../entity/UserModel";
import {makeError} from "../utils/BaseResponse";

const authenticateJWT = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const bearerToken = request.headers["authorization"]?.toString()
    const token = bearerToken?.split(" ")[1]
    if (!token) {
      return makeError(response, 403, "A token is required for authentication")
    }
    const {verify} = jsonwebtoken
    const secret: string = String(process.env.AUTH_SECRET)
    const decoded: any = verify(token, secret)

    let user = await AppDataSource.getRepository(UserModel)
      .findOne({where: {id: decoded["userId"]}})

    if (!user) {
      return makeError(response, 403, "Resource not allowed")
    }

    const _userRes: Partial<UserModel> = user;
    delete _userRes['password']
    // Attach request's identity to Request object
    request.body["performer"] = _userRes
  } catch (err) {
    return makeError(response, 401, "Invalid Token")
  }

  return next()
}

export const generateJWT = (user: Pick<UserModel, "id">) => sign({userId: user.id}, String(process.env.AUTH_SECRET), {
  expiresIn: 24 * 60 * 60  // expires in 24 hours
})

export default authenticateJWT
