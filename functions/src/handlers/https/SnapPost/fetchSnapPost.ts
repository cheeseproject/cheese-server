import { z } from "zod"
import { snapPostService } from "../../../services/SnapPost/SnapPostService"
import { Validator } from "../../Validator"
import {
  SnapPostResponse,
  SnapPostResponseList,
  toSnapPostResponse,
  toSnapPostResponseList,
} from "./response/SnapPostResponse"
import { baseFunction } from "../../baseFunction"

/**
 * 自分の投稿を取得する
 */
export const fetchMySnapPosts = baseFunction<SnapPostResponseList>(async (_, context) => {
  const { userId } = Validator.auth(context)
  const snapPosts = await snapPostService.findByUserId(userId)
  return toSnapPostResponseList(snapPosts)
})

/**
 * いいねした投稿を取得する
 */
export const fetchLikedSnapPosts = baseFunction<SnapPostResponseList>(async (_, context) => {
  const { userId } = Validator.auth(context)
  const snapPosts = await snapPostService.findLikeIdByUserId(userId)
  return toSnapPostResponseList(snapPosts)
})

/**
 * 投稿を取得する
 */

const FetchSnapPostRequestScheme = z.object({
  snapPostId: z.string(),
})

export const fetchSnapPost = baseFunction<SnapPostResponse>(async (data, context) => {
  Validator.auth(context)
  const params = Validator.scheme(data, FetchSnapPostRequestScheme)
  const snapPost = await snapPostService.findById(params.snapPostId)
  return toSnapPostResponse(snapPost)
})
