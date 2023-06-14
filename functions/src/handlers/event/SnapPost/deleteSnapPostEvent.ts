import { logger } from "firebase-functions/v1"
import { REGION, functions } from "../../../firebase/config"
import { likedSnapPostRepository } from "../../../repositories/LikedSnapPost/LikedSnapPostRepository"

export const deleteSnapPostEvent = functions
  .region(REGION)
  .firestore.document("snapPosts/{snapPostId}")
  .onDelete(async (_, context) => {
    const snapPostId = context.params.snapPostId

    const likedUserIds = await likedSnapPostRepository.findUserIdsById(snapPostId)

    likedUserIds.forEach((userId) => {
      try {
        likedSnapPostRepository.delete(userId, snapPostId)
      } catch {
        logger.error(`Failed to delete snapPostId: ${snapPostId}, userId: ${userId}`)
      }
    })
  })
