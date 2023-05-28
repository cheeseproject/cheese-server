import { z } from "zod"
import { SnapPostResponseScheme } from "../../SnapPost/response/SnapPostResponse"
import { SnapRoute } from "../../../../domain/SnapRoute/SnapRoute"

export const SnapRouteResponseScheme = z.object({
  snapRouteId: z.string(),
  title: z.string(),
  createdUserId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  snapPosts: z.array(SnapPostResponseScheme),
})

export type SnapRouteResponse = z.infer<typeof SnapRouteResponseScheme>

export const toSnapRouteResponse = (snapRoute: SnapRoute): SnapRouteResponse => {
  const response: SnapRouteResponse = {
    snapRouteId: snapRoute.snapRouteId,
    title: snapRoute.title,
    createdUserId: snapRoute.createdUserId,
    createdAt: snapRoute.createdAt,
    updatedAt: snapRoute.updatedAt,
    snapPosts: snapRoute.snapPosts.map((snapPost) => ({
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
    })),
  }
  return response
}
