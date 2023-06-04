import { REGION, functions } from "../../../firebase/config"
import { Validator } from "../../Validator"
import { userService } from "../../../services/User/UserService"
import { z } from "zod"
import { toUserResponse } from "./response/UserResponse"

/**
 * 自分のユーザー情報を取得する
 */
export const fetchMyUser = functions.region(REGION).https.onCall(async (_, context) => {
  const { userId } = Validator.auth(context)
  const user = await userService.findById(userId)
  return toUserResponse(user)
})

/**
 * idでユーザーを取得する
 */

const UserRequestScheme = z.object({
  userId: z.string(),
})

export const fetchUser = functions.region(REGION).https.onCall(async (data, context) => {
  Validator.auth(context)
  const params = Validator.scheme(data, UserRequestScheme)
  const user = await userService.findById(params.userId)
  return toUserResponse(user)
})
