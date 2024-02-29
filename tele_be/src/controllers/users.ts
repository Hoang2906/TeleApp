import {Router} from "express";
import {makeSuccess} from "../utils/BaseResponse";

const router = Router()
router.get("/profile", (req, res) => {
  const user = req.body["performer"]
  makeSuccess(res, user)
})

export default router