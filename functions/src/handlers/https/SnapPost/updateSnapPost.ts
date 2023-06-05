import { z } from "zod"
import { snapPostService } from "../../../services/SnapPost/SnapPostService"
import { Validator } from "../../Validator"
import { baseFunction } from "../../baseFunction"

const UpdateRequestScheme = z.object({
  snapPostId: z.string(),
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

export const updateSnapPost = baseFunction(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, UpdateRequestScheme)
  await snapPostService.update(params, userId, params.snapPostId)
})
