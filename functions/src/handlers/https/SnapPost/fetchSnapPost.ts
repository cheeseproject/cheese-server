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
import { SnapPostCountResponse, toSnapPostCountResponse } from "./response/SnapPostCountResponse"

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

/**
 * ランダムな投稿を取得する
 */
const FetchRandomSnapPostsRequestScheme = z.object({
  randomIndexes: z.array(z.number()),
})

export const fetchRandomSnapPosts = baseFunction<SnapPostResponseList>(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, FetchRandomSnapPostsRequestScheme)
  const snapPosts = await snapPostService.findByRandomIndexesAndNotUserId(params.randomIndexes, userId)
  return toSnapPostResponseList(snapPosts)
})

/**
 * 投稿の数を取得する
 */
export const fetchSnapPostsCount = baseFunction<SnapPostCountResponse>(async (_, context) => {
  Validator.auth(context)
  const snapPostsCount = await snapPostService.count()
  return toSnapPostCountResponse(snapPostsCount)
})

/**
 * 緯度経度で範囲を指定して投稿を取得する
 */
const FetchNearbySnapPostsRequestScheme = z.object({
  latitude: z.number(),
  longitude: z.number(),
})
export const fetchNearbySnapPosts = baseFunction<SnapPostResponseList>(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, FetchNearbySnapPostsRequestScheme)
  const snapPosts = await snapPostService.findByGeographyRange(userId, params.latitude, params.longitude)
  return toSnapPostResponseList(snapPosts)
})
