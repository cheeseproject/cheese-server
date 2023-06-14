import { FieldPath } from "firebase-admin/firestore"
import { SnapPost } from "../../domain/SnapPost/SnapPost"
import { LikedSnapPostConverter } from "../User/LikedSnapPostConverter"
import { SnapPostChangeLogConverter, SnapPostConverter } from "./SnapPostConverter"
import { SnapPostCreateLogDocument, SnapPostDocument, references } from "../../scheme/"

export class SnapPostRepository {
  public async save(snapPost: SnapPost): Promise<void> {
    await references.snapPosts._snapPostsId(snapPost.snapPostId).ref.withConverter(SnapPostConverter).set(snapPost)
    const latestRandomId = await this.findLatestRandomId()
    await this.saveSnapPostCreateLog(snapPost.snapPostId, latestRandomId)
  }

  private async connectLikedToUser(userId: string, snapPost: SnapPost): Promise<void> {
    await references.users
      ._userId(userId)
      .likedSnapPosts._likedSnapPostsId(snapPost.snapPostId)
      .ref.withConverter(LikedSnapPostConverter)
      .set(snapPost)
  }

  public async saveLiked(userId: string, snapPost: SnapPost): Promise<void> {
    await this.connectLikedToUser(userId, snapPost)
    await this.save(snapPost)
  }

  public async update(snapPost: SnapPost): Promise<void> {
    await references.snapPosts._snapPostsId(snapPost.snapPostId).ref.withConverter(SnapPostConverter).set(snapPost)
    await this.saveSnapPostChangeLog(snapPost)
  }

  public async findById(snapPostId: string): Promise<SnapPost | undefined> {
    const snapshot = await references.snapPosts._snapPostsId(snapPostId).ref.withConverter(SnapPostConverter).get()
    return snapshot.data()
  }

  public async findByIdAndUserId(userId: string, snapPostId: string): Promise<SnapPost | undefined> {
    const snapshot = await references.snapPosts.ref
      .where(FieldPath.documentId(), "==", snapPostId)
      .where("postedUser.userId", "==", userId)
      .withConverter(SnapPostConverter)
      .get()
    return snapshot.docs.length > 0 ? snapshot.docs[0].data() : undefined
  }

  public async findLikeIdByUserId(userId: string): Promise<SnapPost[]> {
    const snapshot = await references.users
      ._userId(userId)
      .likedSnapPosts.ref.withConverter(LikedSnapPostConverter)
      .orderBy("likedAt", "desc")
      .get()
    return snapshot.docs.map((doc) => doc.data())
  }

  public async findByUserId(userId: string): Promise<SnapPost[]> {
    const snapshot = await references.snapPosts.ref
      .where("postedUser.userId", "==", userId)
      .withConverter(SnapPostConverter)
      .get()
    return snapshot.docs.map((doc) => doc.data())
  }

  public async findByIds(snapPostIds: string[]): Promise<SnapPost[]> {
    const snapshot = await references.snapPosts.ref
      .where(FieldPath.documentId(), "in", snapPostIds)
      .withConverter(SnapPostConverter)
      .get()
    return snapshot.docs.map((doc) => doc.data())
  }

  public async findByRandomIndexesAndNotUserId(randomIndexes: number[], userId: string): Promise<SnapPost[]> {
    const snapshot = await references.snapPosts.ref
      .where("randomIndex", "in", randomIndexes)
      .where("postedUser.userId", "!=", userId)
      .withConverter(SnapPostConverter)
      .get()
    return snapshot.docs.map((doc) => doc.data())
  }

  public async delete(snapPostId: string): Promise<void> {
    await references.snapPosts.ref.doc(snapPostId).withConverter(SnapPostConverter).delete()
  }

  public async count(): Promise<number> {
    const snapshot = await references.snapPosts.ref.count().get()
    return snapshot.data().count
  }

  private async findLatestRandomId(): Promise<number> {
    const snapshot = (await references.snapPosts.ref
      .orderBy("postedUser.postedAt", "desc")
      .limit(1)
      .get()) as FirebaseFirestore.QuerySnapshot<SnapPostDocument>

    // NOTE: 一番最初の投稿の場合は、randomIdがnullになるので、0を返す
    return snapshot.docs[0]?.data().randomIndex ?? 0
  }

  private async saveSnapPostChangeLog(snapPost: SnapPost): Promise<void> {
    const document = SnapPostChangeLogConverter.toFirestore(snapPost)
    await references.snapPosts._snapPostsId(snapPost.snapPostId).snapPostChangeLogs.ref.add(document)
  }

  private async saveSnapPostCreateLog(snapPostId: string, latestRandomIndex: number): Promise<void> {
    const document: SnapPostCreateLogDocument = { latestRandomIndex }
    await references.snapPosts._snapPostsId(snapPostId).snapPostCreateLogs.ref.add(document)
  }
}

export const snapPostRepository = new SnapPostRepository()
