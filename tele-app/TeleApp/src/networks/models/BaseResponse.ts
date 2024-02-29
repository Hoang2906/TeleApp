export default interface BaseResponse<T> {
  status_code: number,
  data: T,
  message: string
}
