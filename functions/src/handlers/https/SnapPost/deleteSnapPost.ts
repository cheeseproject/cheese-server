import { z } from "zod"
import { snapPostService } from "../../../services/SnapPost/SnapPostService"
import { Validator } from "../../Validator"
import { baseFunction } from "../../baseFunction"

const RequestScheme = z.object({
  snapPostId: z.string(),
})

export const deleteSnapPost = baseFunction(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, RequestScheme)
  await snapPostService.delete(userId, params.snapPostId)
})
