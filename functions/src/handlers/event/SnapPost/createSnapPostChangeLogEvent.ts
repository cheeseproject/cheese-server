import { logger } from "firebase-functions/v1"
import { REGION, functions } from "../../../firebase/config"
import { SnapPostChangeLogDocument, references } from "../../../scheme"
import { likedSnapPostRepository } from "../../../repositories/LikedSnapPost/LikedSnapPostRepository"

export const createSnapPostChangeLogEvent = functions
  .region(REGION)
  .firestore.document("snapPosts/{snapPostId}/snapPostChangeLogs/{snapPostChangeLogId}")
  .onCreate(async (snapshot, context) => {
    const snapPostId = context.params.snapPostId
    const params = snapshot.data() as SnapPostChangeLogDocument

    const likedUserIds = await likedSnapPostRepository.findUserIdsById(snapPostId)

    likedUserIds.forEach((userId) => {
      try {
        updateLikedSnapPostDocument(userId, snapPostId, params)
      } catch {
        logger.error(`Failed to update snapPostId: ${snapPostId}, userId: ${userId}`)
      }
    })
  })

const updateLikedSnapPostDocument = async (
  userId: string,
  snapPostId: string,
  params: SnapPostChangeLogDocument
): Promise<void> => {
  await references.users._userId(userId).likedSnapPosts._likedSnapPostsId(snapPostId).ref.update({
    "snapPost.postedUser.title": params.title,
    "snapPost.postedUser.comment": params.comment,
    "snapPost.postedUser.updatedAt": params.updatedAt,
  })
}
