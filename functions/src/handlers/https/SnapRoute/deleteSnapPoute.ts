import { z } from "zod"
import { REGION, functions } from "../../../firebase/config"
import { Validator } from "../../Validator"
import { snapRouteService } from "../../../services/SnapRoute/SnapRouteService"

const RequestScheme = z.object({
  snapRouteId: z.string(),
})

export const deleteSnapRoute = functions.region(REGION).https.onCall(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, RequestScheme)
  await snapRouteService.delete(params.snapRouteId, userId)
})
