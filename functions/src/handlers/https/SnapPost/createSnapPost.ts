import { z } from "zod"
import { REGION, functions } from "../../../firebase/config"
import { snapPostService } from "../../../services/SnapPost/SnapPostService"
import { Validator } from "../../Validator"

const RequestScheme = z.object({
  title: z.string(),
  comment: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  postImages: z.array(
    z.object({
      imagePath: z.string(),
      tags: z.array(z.string()),
    })
  ),
})

export const createSnapPost = functions.region(REGION).https.onCall(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, RequestScheme)
  await snapPostService.save(params, userId)
})
