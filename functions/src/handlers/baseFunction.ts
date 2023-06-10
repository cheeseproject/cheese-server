import { HttpsFunction, https } from "firebase-functions/v1"
import { REGION, functions } from "../firebase/config"

export const baseFunction = <T>(
  handler: (data: unknown, context: https.CallableContext) => T | Promise<T>
): HttpsFunction => {
  return functions.region(REGION).https.onCall(handler)
}
