import { z } from "zod"
import { REGION, functions } from "../../../firebase/config"
import { Validator } from "../../Validator"
import { userService } from "../../../services/User/UserService"

const RequestScheme = z.object({
  name: z.string(),
  iconPath: z.string(),
})

export const updateUser = functions.region(REGION).https.onCall(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, RequestScheme)
  await userService.save(params, userId)
})
