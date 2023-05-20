import { z } from "zod"
import { TIME_ZONE, functions } from "../../../firebase/config"
import { snapPostService } from "../../../services/SnapPost/SnapPostService"
import { Validator } from "../../Validator"

const RequestScheme = z.object({
  snapPostId: z.string(),
})

export const deleteSnapPost = functions.region(TIME_ZONE).https.onCall(async (data, context) => {
  const { userId } = Validator.auth(context)
  const params = Validator.scheme(data, RequestScheme)
  await snapPostService.delete(userId, params.snapPostId)
})
