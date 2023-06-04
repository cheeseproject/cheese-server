import { Timestamp } from "firebase-admin/firestore"
import { dateToTimestamp } from "../../libs/dateToTimestamp"

test("isTimestamp", () => {
  const date = new Date()
  const timestamp = dateToTimestamp(date)
  expect(timestamp).toBeInstanceOf(Timestamp)
})
