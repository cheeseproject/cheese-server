import * as firebase from "firebase-admin"

export const dateToTimestamp = (date: Date): firebase.firestore.Timestamp => {
  return firebase.firestore.Timestamp.fromDate(date)
}
