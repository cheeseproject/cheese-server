import { TIME_ZONE, functions } from "../../../firebase/config"

import { Validator } from "../../Validator"
import { userService } from "../../../services/User/UserService"
import { z } from "zod"

export const fetchMyUser = functions.region(TIME_ZONE).https.onCall(async (data, context) => {
  const { userId } = Validator.auth(context)
  await userService.findById(userId)
})

const UserRequestScheme = z.object({
  userId: z.string(),
})

export const fetchUser = functions.region(TIME_ZONE).https.onCall(async (data, context) => {
  Validator.auth(context)
  const params = Validator.scheme(data, UserRequestScheme)
  await userService.findById(params.userId)
})
