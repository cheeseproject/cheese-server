import { z } from "zod"
import { snapPostService } from "../../../services/SnapPost/SnapPostService"
import { Validator } from "../../Validator"
import { toSnapPostResponse } from "./response/SnapPostResponse"
import { baseFunction } from "../../baseFunction"

/**
 * 自分の投稿を取得する
 */
export const fetchMySnapPosts = baseFunction(async (_, context) => {
  const { userId } = Validator.auth(context)
  const snapPosts = await snapPostService.findByUserId(userId)
  return snapPosts.map((snapPost) => toSnapPostResponse(snapPost))
})

/**
 * いいねした投稿を取得する
 */
export const fetchLikedSnapPosts = baseFunction(async (_, context) => {
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

export const fetchSnapPost = baseFunction(async (data, context) => {
  Validator.auth(context)
  const params = Validator.scheme(data, SnapPostRequestScheme)
  const snapPost = await snapPostService.findById(params.snapPostId)
  return toSnapPostResponse(snapPost)
})
