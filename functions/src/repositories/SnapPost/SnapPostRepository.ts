import { SnapPost } from "../../domain/SnapPost/SnapPost"
import { db } from "../../firebase/config"
import { SnapPostConverter } from "./SnapPostConverter"

export class SnapPostRepository {
  private readonly collectionRef = db.collection("snapPosts")

  public async save(snapPost: SnapPost): Promise<void> {
    await this.collectionRef.doc(snapPost.snapPostId).withConverter(SnapPostConverter).set(snapPost)
  }
}

export const snapPostRepository = new SnapPostRepository()
