import { logger } from "firebase-functions/v1"
import { REGION, functions } from "../../.."
import { snapPostRepository } from "../../../repositories/SnapPost/SnapPostRepository"
import { references } from "../../../scheme"
import { SnapPostConverter } from "../../../repositories/SnapPost/SnapPostConverter"

// NOTE: スナップポストのいいね数をあげる
export const createLikedSnapPostEvent = functions
  .region(REGION)
  .firestore.document("users/{userId}/likedSnapPosts/{likedSnapPostId}")
  .onCreate(async (_, context) => {
    const userId = context.params.userId
    const likedSnapPostId = context.params.likedSnapPostId

    const snapPost = await snapPostRepository.findById(likedSnapPostId)

    if (!snapPost) {
      logger.error(`Failed to find snapPostId: ${likedSnapPostId}`)
      return
    }
    const likedSnapPost = snapPost.liked()

    try {
      await references.snapPosts
        ._snapPostsId(snapPost.snapPostId)
        .ref.withConverter(SnapPostConverter)
        .set(likedSnapPost)
    } catch {
      logger.error(`Failed to update snapPostId: ${likedSnapPostId}, userId: ${userId}`)
    }
  })
