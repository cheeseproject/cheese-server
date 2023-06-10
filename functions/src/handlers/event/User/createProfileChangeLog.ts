import { REGION, functions } from "../../../firebase/config"
import { ProfileChangeLogDocument, references } from "../../../scheme"
import { snapPostRepository } from "../../../repositories/SnapPost/SnapPostRepository"
import { logger } from "firebase-functions/v1"

export const createProfileChangeLog = functions
  .region(REGION)
  .firestore.document("users/{userId}/profileChangeLogs/{profileChangeLogId}")
  .onCreate(async (snapshot, context) => {
    const userId = context.params.userId
    const params = snapshot.data() as ProfileChangeLogDocument

    const snapPosts = await snapPostRepository.findByUserId(userId)
    const snapPostIds = snapPosts.map((snapPost) => snapPost.snapPostId)

    snapPostIds.forEach((snapPostId) => {
      try {
        updateSnapPostDocument(snapPostId, params)
      } catch {
        logger.error(`Failed to update snapPostId: ${snapPostId}, userId: ${userId}`)
      }
    })

    const likedSnapPosts = await snapPostRepository.findLikeIdByUserId(userId)
    const likedSnapPostIds = likedSnapPosts.map((snapPost) => snapPost.snapPostId)

    likedSnapPostIds.forEach((snapPostId) => {
      try {
        updateLikedSnapPostDocument(userId, snapPostId, params)
      } catch {
        logger.error(`Failed to update snapPostId: ${snapPostId}, userId: ${userId}`)
      }
    })
  })

const updateSnapPostDocument = async (snapPostId: string, params: ProfileChangeLogDocument): Promise<void> => {
  await references.snapPosts._snapPostsId(snapPostId).ref.update({
    "postedUser.name": params.name,
    "postedUser.iconPath": params.iconPath,
  })
}

const updateLikedSnapPostDocument = async (
  userId: string,
  snapPostId: string,
  params: ProfileChangeLogDocument
): Promise<void> => {
  await references.users._userId(userId).likedSnapPosts._likedSnapPostsId(snapPostId).ref.update({
    "snapPost.postedUser.name": params.name,
    "snapPost.postedUser.iconPath": params.iconPath,
  })
}
