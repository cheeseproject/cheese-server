import { z } from "zod"
import { SnapPost } from "../../../../domain/SnapPost/SnapPost"

export const SnapPostResponseScheme = z.object({
  snapPostId: z.string(),
  userId: z.string(),
  postImages: z.array(
    z.object({
      imagePath: z.string(),
    })
  ),
  tags: z.array(z.string()),
  title: z.string(),
  comment: z.string().optional(),
  longitude: z.number(),
  latitude: z.number(),
  postedAt: z.string(),
  updatedAt: z.string(),
  likedCount: z.number(),
  postedUser: z.object({
    userId: z.string(),
    name: z.string(),
    iconPath: z.string(),
  }),
})

export type SnapPostResponse = z.infer<typeof SnapPostResponseScheme>

export const toSnapPostResponse = (snapPost: SnapPost): SnapPostResponse => {
  const response: SnapPostResponse = {
    snapPostId: snapPost.snapPostId,
    userId: snapPost.postedUser.userId,
    postImages: snapPost.postImages.map((postImage) => ({
      imagePath: postImage.imagePath,
    })),
    tags: snapPost.tags,
    title: snapPost.title,
    comment: snapPost.comment,
    longitude: snapPost.coordinate.longitude.value,
    latitude: snapPost.coordinate.latitude.value,
    postedAt: snapPost.postedAt.toISOString(),
    updatedAt: snapPost.updatedAt.toISOString(),
    likedCount: snapPost.likedCount.value,
    postedUser: {
      userId: snapPost.postedUser.userId,
      name: snapPost.postedUser.name,
      iconPath: snapPost.postedUser.iconPath,
    },
  }
  return response
}

export const SnapPostResponseListScheme = z.array(SnapPostResponseScheme)

export type SnapPostResponseList = z.infer<typeof SnapPostResponseListScheme>

export const toSnapPostResponseList = (snapPosts: SnapPost[]): SnapPostResponseList => {
  return snapPosts.map((snapPost) => toSnapPostResponse(snapPost))
}
