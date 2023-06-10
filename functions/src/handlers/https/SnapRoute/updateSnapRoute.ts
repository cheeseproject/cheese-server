import { z } from "zod"
import { Validator } from "../../Validator"
import { snapRouteService } from "../../../services/SnapRoute/SnapRouteService"
import { baseFunction } from "../../baseFunction"

const UpdateSnapRouteRequestScheme = z.object({
  snapRouteId: z.string(),
  title: z.string(),
  snapPostIds: z.array(z.string()),
})

export const updateSnapRoute = baseFunction(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, UpdateSnapRouteRequestScheme)
  await snapRouteService.update(params, userId)
})
