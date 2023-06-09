import { User } from "../../domain/User"
import { dateToTimestamp } from "../../libs/dateToTimestamp"
import { generateId } from "../../libs/generateId"
import { userConverter } from "../../repositories/User/UserConverter"
import { UserDocument } from "../../scheme"

test("userConverter: toDocument", () => {
  const userId = generateId()
  const name = "yamada taro"
  const iconPath = "https://hogehoge"
  const date = new Date()
  const radiusInM = 1000

  const user = new User(userId, name, iconPath, date, date, radiusInM)
  const userDocument = userConverter.toFirestore(user)

  const timestamp = dateToTimestamp(date)
  const firestoreDocument: UserDocument = {
    name,
    iconPath,
    resistedAt: timestamp,
    updatedAt: timestamp,
    searchedRadiusInM: radiusInM,
  }
  expect(userDocument).toEqual(firestoreDocument)
})
