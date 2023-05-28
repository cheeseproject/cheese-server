import { z } from "zod"
import { SnapPost } from "../../../../domain/SnapPost/SnapPost"

export const SnapPostResponseScheme = z.object({
  snapPostId: z.string(),
  userId: z.string(),
  images: z.array(
    z.object({
      imagePath: z.string(),
      tags: z.array(z.string()),
    })
  ),
  title: z.string(),
  comment: z.string().optional(),
  longitude: z.number(),
  latitude: z.number(),
  postedAt: z.date(),
  updatedAt: z.date(),
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
    images: snapPost.postImages.map((postImage) => ({
      imagePath: postImage.imagePath,
      tags: postImage.tags,
    })),
    title: snapPost.title,
    comment: snapPost.comment,
    longitude: snapPost.longitude,
    latitude: snapPost.latitude,
    postedAt: snapPost.postedAt,
    updatedAt: snapPost.updatedAt,
    likedCount: snapPost.likedCount.value,
    postedUser: {
      userId: snapPost.postedUser.userId,
      name: snapPost.postedUser.name,
      iconPath: snapPost.postedUser.iconPath,
    },
  }
  return response
}
