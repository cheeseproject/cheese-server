import { z } from "zod"
import { Validator } from "../../Validator"
import { snapRouteService } from "../../../services/SnapRoute/SnapRouteService"
import { baseFunction } from "../../baseFunction"

const CreateSnapRouteRequestScheme = z.object({
  title: z.string(),
  snapPostIds: z.array(z.string()),
})

export const createSnapRoute = baseFunction(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, CreateSnapRouteRequestScheme)
  await snapRouteService.save(params, userId)
})
