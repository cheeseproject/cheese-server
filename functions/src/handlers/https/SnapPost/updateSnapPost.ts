import { z } from "zod"
import { TIME_ZONE, functions } from "../../../firebase/config"
import { snapPostService } from "../../../services/SnapPost/SnapPostService"
import { Validator } from "../../Validator"

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

export const updateSnapPost = functions.region(TIME_ZONE).https.onCall(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, UpdateRequestScheme)
  await snapPostService.update(params, userId, params.snapPostId)
})

const LikeRequestScheme = z.object({
  snapPostIds: z.array(z.string()),
})

export const likeSnapPost = functions.region(TIME_ZONE).https.onCall(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, LikeRequestScheme)
  await snapPostService.like(userId, params.snapPostIds)
})
