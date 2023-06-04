import { z } from "zod"
import { REGION, functions } from "../../../firebase/config"
import { snapPostService } from "../../../services/SnapPost/SnapPostService"
import { Validator } from "../../Validator"
import { toSnapPostResponse } from "./response/SnapPostResponse"

/**
 * 自分の投稿を取得する
 */
export const fetchMySnapPosts = functions.region(REGION).https.onCall(async (_, context) => {
  const { userId } = Validator.auth(context)
  const snapPosts = await snapPostService.findByUserId(userId)
  return snapPosts.map((snapPost) => toSnapPostResponse(snapPost))
})

/**
 * いいねした投稿を取得する
 */
export const fetchLikedSnapPosts = functions.region(REGION).https.onCall(async (_, context) => {
  const { userId } = Validator.auth(context)
  const snapPosts = await snapPostService.findLikeIdByUserId(userId)
  return snapPosts.map((snapPost) => toSnapPostResponse(snapPost))
})

/**
 * 投稿を取得する
 */

const SnapPostRequestScheme = z.object({
  snapPostId: z.string(),
})

export const fetchSnapPost = functions.region(REGION).https.onCall(async (data, context) => {
  Validator.auth(context)
  const params = Validator.scheme(data, SnapPostRequestScheme)
  const snapPost = await snapPostService.findById(params.snapPostId)
  return toSnapPostResponse(snapPost)
})
