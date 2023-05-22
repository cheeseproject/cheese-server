import { z } from "zod"
import { TIME_ZONE, functions } from "../../../firebase/config"
import { Validator } from "../../Validator"
import { userService } from "../../../services/User/UserService"

const UserRequestScheme = z.object({
  name: z.string(),
  iconPath: z.string(),
})

export const createUser = functions.region(TIME_ZONE).https.onCall(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, UserRequestScheme)
  await userService.save(params, userId)
})
