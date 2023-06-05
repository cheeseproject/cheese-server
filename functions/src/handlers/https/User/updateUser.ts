import { z } from "zod"
import { Validator } from "../../Validator"
import { userService } from "../../../services/User/UserService"
import { baseFunction } from "../../baseFunction"

const RequestScheme = z.object({
  name: z.string(),
  iconPath: z.string(),
})

export const updateUser = baseFunction(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, RequestScheme)
  await userService.save(params, userId)
})
