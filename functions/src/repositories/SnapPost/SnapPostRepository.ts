import { FieldPath } from "firebase-admin/firestore"
import { SnapPost } from "../../domain/SnapPost/SnapPost"
import { db } from "../../firebase/config"
import { LikedSnapPostConverter } from "../User/LikedSnapPostConverter"
import { SnapPostConverter } from "./SnapPostConverter"

export class SnapPostRepository {
  private readonly collectionRef = db.collection("snapPosts")
  private userLikedRef(userId: string) {
    return db.collection("users").doc(userId).collection("likedSnapPosts")
  }

  public async save(snapPost: SnapPost): Promise<void> {
    await this.collectionRef.doc(snapPost.snapPostId).withConverter(SnapPostConverter).set(snapPost)
  }

  private async connectLikedToUser(userId: string, snapPost: SnapPost): Promise<void> {
    await this.userLikedRef(userId).doc(snapPost.snapPostId).withConverter(LikedSnapPostConverter).set(snapPost)
  }

  public async saveLiked(userId: string, snapPost: SnapPost): Promise<void> {
    await this.connectLikedToUser(userId, snapPost)
    await this.save(snapPost)
  }

  public async findById(snapPostId: string): Promise<SnapPost | undefined> {
    const snapshot = await this.collectionRef.doc(snapPostId).withConverter(SnapPostConverter).get()
    return snapshot.data()
  }

  public async findByIdAndUserId(userId: string, snapPostId: string): Promise<SnapPost | undefined> {
    const snapshot = await this.collectionRef
      .where(FieldPath.documentId(), "==", snapPostId)
      .where("postedUser.userId", "==", userId)
      .withConverter(SnapPostConverter)
      .get()
    return snapshot.docs.length > 0 ? snapshot.docs[0].data() : undefined
  }

  public async findLikeIdByUserId(userId: string): Promise<SnapPost[]> {
    const snapshot = await this.userLikedRef(userId)
      .withConverter(LikedSnapPostConverter)
      .orderBy("likedAt", "desc")
      .get()
    return snapshot.docs.map((doc) => doc.data())
  }

  public async findByUserId(userId: string): Promise<SnapPost[]> {
    const snapshot = await this.collectionRef
      .where("postedUser.userId", "==", userId)
      .withConverter(SnapPostConverter)
      .get()
    return snapshot.docs.map((doc) => doc.data())
  }

  public async findByIds(snapPostIds: string[]): Promise<SnapPost[]> {
    const snapshot = await this.collectionRef
      .where(FieldPath.documentId(), "in", snapPostIds)
      .withConverter(SnapPostConverter)
      .get()
    return snapshot.docs.map((doc) => doc.data())
  }

  public async delete(snapPostId: string): Promise<void> {
    await this.collectionRef.doc(snapPostId).withConverter(SnapPostConverter).delete()
  }
}

export const snapPostRepository = new SnapPostRepository()
