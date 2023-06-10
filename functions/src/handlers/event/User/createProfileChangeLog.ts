import { WriteBatch } from "firebase-admin/firestore"
import { REGION, functions } from "../../../firebase/config"
import { ProfileChangeLogDocument } from "../../../scheme"
import { snapPostRepository } from "../../../repositories/SnapPost/SnapPostRepository"

export const createProfileChangeLog = functions
  .region(REGION)
  .firestore.document("users/{userId}/profileChangeLogs/{profileChangeLogId}")
  .onCreate(async (snapshot, context) => {
    const userId = context.params.userId
    const params = snapshot.data() as ProfileChangeLogDocument

    const snapPosts = await snapPostRepository.findByUserId(userId)
    const snapPostIds = snapPosts.map((snapPost) => snapPost.snapPostId)
  })

const updateSnapPostDocument = async (snapPostId: string): Promise<void> => {
  return
}

const updateLikedSnapPostDocument = async (): Promise<void> => {
  return
}
