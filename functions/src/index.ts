import * as functions from "firebase-functions"

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) =>
  middleware(request, response, () => {
    console.log("helloWorld")
    response.send("Hello from Firebase!")
  })
)

const middleware = (req: functions.Request, res: functions.Response, next: () => void) => {
  console.log("middleware start")
  next()
  console.log("middleware end")
}
