export * as functions from "firebase-functions"
import * as firebase from "firebase-admin"

firebase.initializeApp()
export const db = firebase.firestore()
export const TIME_ZONE = "Asia/Tokyo"
