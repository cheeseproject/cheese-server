import { SnapPost } from "../../domain/SnapPost/SnapPost"
import { groupReferences, references } from "../../scheme"
import { LikedSnapPostConverter } from "./LikedSnapPostConverter"

class LikedSnapPostRepository {
  public async save(userId: string, snapPost: SnapPost): Promise<void> {
    await references.users
      ._userId(userId)
      .likedSnapPosts._likedSnapPostsId(snapPost.snapPostId)
      .ref.withConverter(LikedSnapPostConverter)
      .set(snapPost)
  }

  public async findByUserId(userId: string): Promise<SnapPost[]> {
    const snapshot = await references.users
      ._userId(userId)
      .likedSnapPosts.ref.withConverter(LikedSnapPostConverter)
      .orderBy("likedAt", "desc")
      .get()
    return snapshot.docs.map((doc) => doc.data())
  }

  public findUserIdsById = async (snapPostId: string): Promise<string[]> => {
    const snapshot = await groupReferences.likedSnapPosts.ref
      .withConverter(LikedSnapPostConverter)
      .where("snapPost.snapPostId", "==", snapPostId)
      .get()
    return snapshot.docs.map((doc) => doc.ref.parent?.parent?.id).filter((id) => Boolean(id)) as string[]
  }

  public async delete(userId: string, snapPostId: string): Promise<void> {
    await references.users._userId(userId).likedSnapPosts._likedSnapPostsId(snapPostId).ref.delete()
  }
}

export const likedSnapPostRepository = new LikedSnapPostRepository()
