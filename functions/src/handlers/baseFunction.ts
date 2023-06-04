import { HttpsFunction, https } from "firebase-functions/v1"
import { functions } from "../firebase/config"

export const baseFunction = (
  handler: (data: unknown, context: https.CallableContext) => unknown | Promise<unknown>
): HttpsFunction => {
  return functions.https.onCall(handler)
}
