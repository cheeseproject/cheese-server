/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { removeNulls } from "../../libs/nullToUndefined"

test("nullToUndefined", () => {
  const nullObject = {
    a: null,
    b: "hoge",
    c: {
      d: null,
    },
  }
  const undefinedObject = removeNulls(nullObject)
  const expectedObject = {
    a: undefined,
    b: "hoge",
    c: {
      d: undefined,
    },
  }
  expect(undefinedObject).toEqual(expectedObject)
})
