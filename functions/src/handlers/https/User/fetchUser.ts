import { Validator } from "../../Validator"
import { userService } from "../../../services/User/UserService"
import { z } from "zod"
import { UserResponse, toUserResponse } from "./response/UserResponse"
import { baseFunction } from "../../baseFunction"

/**
 * 自分のユーザー情報を取得する
 */
export const fetchMyUser = baseFunction<UserResponse>(async (_, context) => {
  const { userId } = Validator.auth(context)
  const user = await userService.findById(userId)
  return toUserResponse(user)
})

/**
 * idでユーザーを取得する
 */

const FetchUserRequestScheme = z.object({
  userId: z.string(),
})

export const fetchUser = baseFunction<UserResponse>(async (data, context) => {
  Validator.auth(context)
  const params = Validator.scheme(data, FetchUserRequestScheme)
  const user = await userService.findById(params.userId)
  return toUserResponse(user)
})
