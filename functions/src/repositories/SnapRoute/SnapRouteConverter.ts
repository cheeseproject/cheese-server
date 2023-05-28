import { SnapRoute } from "../../domain/SnapRoute/SnapRoute"
import { dateToTimestamp } from "../../libs/dateToTimestamp"
import { SnapRouteDocument } from "../../scheme"
import { DocumentData } from "firebase-admin/firestore"
import { db } from "../../firebase/config"

export const snapRouteConverter = {
  toFirestore(snapRoute: SnapRoute): DocumentData {
    const SnapRouteDocument: SnapRouteDocument = {
      title: snapRoute.title,
      createdAt: dateToTimestamp(snapRoute.createdAt),
      updatedAt: dateToTimestamp(snapRoute.updatedAt),
      snapPosts: snapRoute.snapPosts.map((snapPost) => {
        return {
          snapPostRef: db.collection("snapPosts").doc(snapPost.snapPostId),
          snapPostId: snapPost.snapPostId,
        }
      }),
    }
    return SnapRouteDocument
  },
}
