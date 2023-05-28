import { z } from "zod"
import { TIME_ZONE, functions } from "../../../firebase/config"
import { Validator } from "../../Validator"
import { snapRouteService } from "../../../services/SnapRoute/SnapRouteService"

const RequestScheme = z.object({
  snapRouteId: z.string(),
  title: z.string(),
  snapPostIds: z.array(z.string()),
})

export const updateSnapRoute = functions.region(TIME_ZONE).https.onCall(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, RequestScheme)
  await snapRouteService.update(params, userId)
})
