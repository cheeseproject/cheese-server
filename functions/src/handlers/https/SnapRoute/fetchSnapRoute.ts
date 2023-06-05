import { z } from "zod"
import { Validator } from "../../Validator"
import { snapRouteService } from "../../../services/SnapRoute/SnapRouteService"
import { toSnapRouteResponse } from "./response/SnapRouteResponse"
import { baseFunction } from "../../baseFunction"

/**
 * ルートを取得する
 */
const SnapRouteRequestScheme = z.object({
  snapRouteId: z.string(),
})

export const fetchSnapRoute = baseFunction(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, SnapRouteRequestScheme)
  const snapRoute = await snapRouteService.findByIdAndUserId(userId, params.snapRouteId)
  return toSnapRouteResponse(snapRoute)
})

export const fetchMySnapRoutes = baseFunction(async (_, context) => {
  const { userId } = Validator.auth(context)
  const snapRoutes = await snapRouteService.findByUserId(userId)
  return snapRoutes.map((snapRoute) => toSnapRouteResponse(snapRoute))
})
