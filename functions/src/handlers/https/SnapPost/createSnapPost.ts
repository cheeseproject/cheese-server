import { z } from "zod"
import { snapPostService } from "../../../services/SnapPost/SnapPostService"
import { Validator } from "../../Validator"
import { baseFunction } from "../../baseFunction"

const RequestScheme = z.object({
  title: z.string(),
  comment: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  postImages: z.array(
    z.object({
      imagePath: z.string(),
      tags: z.array(z.string()),
    })
  ),
})

export const createSnapPost = baseFunction(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, RequestScheme)
  await snapPostService.save(params, userId)
})
