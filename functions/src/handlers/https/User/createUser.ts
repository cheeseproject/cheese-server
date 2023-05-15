import { z } from "zod"
import { TIME_ZONE, functions } from "../../../firebase/config"
import { userService } from "../../../services/User/userService"
import { Validator } from "../../Validator"

const RequestScheme = z.object({
  name: z.string(),
  iconPath: z.string(),
})

export const createUser = functions.region(TIME_ZONE).https.onCall(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, RequestScheme)
  await userService.save(params, userId)
})
