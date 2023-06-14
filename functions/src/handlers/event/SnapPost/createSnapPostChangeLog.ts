import { logger } from "firebase-functions/v1"
import { REGION, functions } from "../../../firebase/config"
import { LikedSnapPostConverter } from "../../../repositories/User/LikedSnapPostConverter"
import { SnapPostChangeLogDocument, groupReferences, references } from "../../../scheme"

export const createSnapPostChangeLog = functions
  .region(REGION)
  .firestore.document("snapPosts/{snapPostId}/snapPostChangeLogs/{snapPostChangeLogId}")
  .onCreate(async (snapshot, context) => {
    const snapPostId = context.params.snapPostId
    const params = snapshot.data() as SnapPostChangeLogDocument

    const likedUserIds = await findLikedUserIdsBySnapPostId(snapPostId)

    likedUserIds.forEach((userId) => {
      try {
        updateLikedSnapPostDocument(userId, snapPostId, params)
      } catch {
        logger.error(`Failed to update snapPostId: ${snapPostId}, userId: ${userId}`)
      }
    })
  })

const findLikedUserIdsBySnapPostId = async (snapPostId: string): Promise<string[]> => {
  const snapshot = await groupReferences.likedSnapPosts.ref
    .withConverter(LikedSnapPostConverter)
    .where("snapPost.snapPostId", "==", snapPostId)
    .get()
  return snapshot.docs.map((doc) => doc.ref.parent?.parent?.id).filter((id) => Boolean(id)) as string[]
}

const updateLikedSnapPostDocument = async (
  userId: string,
  snapPostId: string,
  params: SnapPostChangeLogDocument
): Promise<void> => {
  await references.users._userId(userId).likedSnapPosts._likedSnapPostsId(snapPostId).ref.update({
    "snapPost.postedUser.title": params.title,
    "snapPost.postedUser.comment": params.comment,
    "snapPost.postedUser.updatedAt": params.updatedAt,
    "snapPost.postedUser.longitude": params.longitude,
    "snapPost.postedUser.latitude": params.latitude,
    "snapPost.postedUser.postImages": params.postImages,
  })
}
