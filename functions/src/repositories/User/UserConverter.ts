import { DocumentData } from "firebase-admin/firestore"
import { User } from "../../domain/User"
import { UserDocument } from "../../scheme"
import { dateToTimestamp } from "../../libs/dateToTimestamp"
import { Snapshot } from "../_types"

export const userConverter = {
  toFirestore(user: User): DocumentData {
    const documentData: UserDocument = {
      name: user.name,
      iconPath: user.iconPath,
      resistedAt: dateToTimestamp(user.resistedAt),
      updatedAt: dateToTimestamp(user.updatedAt),
    }
    return documentData
  },
  fromFirestore(snapshot: Snapshot) {
    const data = snapshot.data() as UserDocument
    return new User(snapshot.id, data.name, data.iconPath, data.resistedAt.toDate(), data.updatedAt.toDate())
  },
}
