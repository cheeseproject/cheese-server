import { HttpsFunction, https } from "firebase-functions/v1"
import { REGION, functions } from "../firebase/config"
import { removeNulls } from "../libs/nullToUndefined"

export const baseFunction = <T>(
  handler: (data: unknown, context: https.CallableContext) => T | Promise<T>
): HttpsFunction => {
  return functions.region(REGION).https.onCall((data: unknown, context: https.CallableContext) => {
    return handler(removeNulls(data), context)
  })
}
