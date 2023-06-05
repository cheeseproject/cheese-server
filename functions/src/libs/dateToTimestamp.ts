import { Timestamp } from "firebase-admin/firestore"

export const dateToTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date)
}
