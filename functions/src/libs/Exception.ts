import { functions } from "../firebase/config"

export class Exception {
  public static unauthenticated(): never {
    throw new functions.https.HttpsError("unauthenticated", "You are not authenticated")
  }
  public static invalidArgument(): never {
    throw new functions.https.HttpsError("invalid-argument", "Invalid argument")
  }
  public static notFound(target: string): never {
    throw new functions.https.HttpsError("not-found", `${target} is not found`)
  }
  public static alreadyExists(target: string): never {
    throw new functions.https.HttpsError("already-exists", `${target} already exists`)
  }
  public static permissionDenied(): never {
    throw new functions.https.HttpsError("permission-denied", "Permission denied")
  }
}
