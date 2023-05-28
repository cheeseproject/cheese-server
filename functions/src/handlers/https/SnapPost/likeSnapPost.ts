import { z } from "zod"
import { TIME_ZONE, functions } from "../../../firebase/config"
import { snapPostService } from "../../../services/SnapPost/SnapPostService"
import { Validator } from "../../Validator"

/**
 * 投稿をいいねする
 */

const LikeRequestScheme = z.object({
  snapPostIds: z.array(z.string()),
})

export const likeSnapPost = functions.region(TIME_ZONE).https.onCall(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, LikeRequestScheme)
  await snapPostService.like(userId, params.snapPostIds)
})
