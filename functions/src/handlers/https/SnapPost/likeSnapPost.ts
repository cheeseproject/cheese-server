import { z } from "zod"
import { snapPostService } from "../../../services/SnapPost/SnapPostService"
import { Validator } from "../../Validator"
import { baseFunction } from "../../baseFunction"

/**
 * 投稿をいいねする
 */

const LikeRequestScheme = z.object({
  snapPostIds: z.array(z.string()),
})

export const likeSnapPost = baseFunction(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, LikeRequestScheme)
  await snapPostService.like(userId, params.snapPostIds)
})
