import { z } from "zod"
import { snapPostService } from "../../../services/SnapPost/SnapPostService"
import { Validator } from "../../Validator"
import { baseFunction } from "../../baseFunction"

const UpdateSnapPostRequestScheme = z.object({
  snapPostId: z.string(),
  title: z.string(),
  comment: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  postImages: z.array(
    z.object({
      imagePath: z.string(),
      tag: z.string(),
    })
  ),
})

export const updateSnapPost = baseFunction(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, UpdateSnapPostRequestScheme)
  await snapPostService.update(params, userId, params.snapPostId)
})
