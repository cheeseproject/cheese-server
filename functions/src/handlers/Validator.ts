import { z } from "zod"
import { functions } from "../firebase/config"
import { Context } from "./_types"

export class Validator {
  // NOTE: 認証されているユーザーかどうかを確認する
  public static auth = (context: Context) => {
    const { auth } = context
    if (!auth || !auth.uid) {
      throw new functions.https.HttpsError("unauthenticated", "You are not authenticated")
    }
    return {
      userId: auth.uid,
    }
  }
  // NOTE: リクエストのパラメーターが正しいかどうかを確認する
  public static scheme = <T extends z.ZodTypeAny>(data: unknown, schema: T): z.infer<T> => {
    try {
      return schema.parse(data)
    } catch (error) {
      throw new functions.https.HttpsError("invalid-argument", "Invalid argument")
    }
  }
}
