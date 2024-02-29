import {Response} from "express";

interface BaseResponse<T> {
  status_code: number,
  data?: T,
  message: string,
}

function makeSuccess<T>(res: Response, data: T, message = "Success") {
  res.status(200).send({
    status_code: 200,
    data,
    message: message
  })
}

function makeError(res: Response, errorCode = 400, message = "Error occurred") {
  res.status(errorCode).send({
    status_code: errorCode,
    message: message
  })
}

export {
  makeSuccess,
  makeError,
}
