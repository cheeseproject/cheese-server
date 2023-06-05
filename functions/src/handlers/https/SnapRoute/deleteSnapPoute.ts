import { z } from "zod"
import { Validator } from "../../Validator"
import { snapRouteService } from "../../../services/SnapRoute/SnapRouteService"
import { baseFunction } from "../../baseFunction"

const RequestScheme = z.object({
  snapRouteId: z.string(),
})

export const deleteSnapRoute = baseFunction(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, RequestScheme)
  await snapRouteService.delete(params.snapRouteId, userId)
})
