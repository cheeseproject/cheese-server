import { logger } from "firebase-functions/v1"
import { REGION, functions } from "../../../firebase/config"
import { SnapPostCreateLogDocument, references } from "../../../scheme"

export const createSnapPostCreateLogEvent = functions
  .region(REGION)
  .firestore.document("snapPosts/{snapPostId}/snapPostCreateLogs/{snapPostCreateLogId}")
  .onCreate(async (snapshot, context) => {
    const snapPostId = context.params.snapPostId
    const params = snapshot.data() as SnapPostCreateLogDocument

    try {
      updateSnapPostDocument(snapPostId, params)
    } catch {
      logger.error(`Failed to update snapPostId: ${snapPostId}`)
    }
  })

const updateSnapPostDocument = async (snapPostId: string, params: SnapPostCreateLogDocument): Promise<void> => {
  await references.snapPosts._snapPostsId(snapPostId).ref.update({
    randomIndex: params.latestRandomIndex + 1,
  })
}
