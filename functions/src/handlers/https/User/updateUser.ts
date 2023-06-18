import { z } from "zod"
import { Validator } from "../../Validator"
import { userService } from "../../../services/User/UserService"
import { baseFunction } from "../../baseFunction"

const UpdateUserRequestScheme = z.object({
  name: z.string(),
  iconPath: z.string(),
  searchedRadiusInM: z.number(),
})

export const updateUser = baseFunction(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, UpdateUserRequestScheme)
  await userService.update(params, userId)
})
