import { z } from "zod"
import { Context } from "./_types"
import { Exception } from "../libs/Exception"

export class Validator {
  // NOTE: 認証されているユーザーかどうかを確認する
  public static auth = (context: Context) => {
    const { auth } = context
    if (!auth || !auth.uid) {
      Exception.unauthenticated()
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
      Exception.invalidArgument()
    }
  }
}
