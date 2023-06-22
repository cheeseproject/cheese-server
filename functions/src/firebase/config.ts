import * as functions from "firebase-functions"
import * as firebase from "firebase-admin"

firebase.initializeApp()
export const db = firebase.firestore()
export const REGION = "asia-northeast1"
export const TIME_ZONE = "Asia/Tokyo"
process.env.TZ = TIME_ZONE
functions.config().firebase = { ignoreUndefinedProperties: false }

export { functions }
