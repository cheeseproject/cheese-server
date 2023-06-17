import { z } from "zod"
import { SnapPostResponseListScheme, toSnapPostResponseList } from "../../SnapPost/response/SnapPostResponse"
import { SnapRoute } from "../../../../domain/SnapRoute/SnapRoute"

export const SnapRouteResponseScheme = z.object({
  snapRouteId: z.string(),
  title: z.string(),
  createdUserId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  snapPosts: SnapPostResponseListScheme,
})

export type SnapRouteResponse = z.infer<typeof SnapRouteResponseScheme>

export const toSnapRouteResponse = (snapRoute: SnapRoute): SnapRouteResponse => {
  const response: SnapRouteResponse = {
    snapRouteId: snapRoute.snapRouteId,
    title: snapRoute.title,
    createdUserId: snapRoute.createdUserId,
    createdAt: snapRoute.createdAt.toISOString(),
    updatedAt: snapRoute.updatedAt.toISOString(),
    snapPosts: toSnapPostResponseList(snapRoute.snapPosts),
  }
  return response
}

export const SnapRouteResponseListScheme = z.array(SnapRouteResponseScheme)

export type SnapRouteResponseList = z.infer<typeof SnapRouteResponseListScheme>
