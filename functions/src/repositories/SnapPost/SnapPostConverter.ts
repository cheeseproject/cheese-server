import { DocumentData } from "firebase-admin/firestore"
import { PostImages } from "../../domain/SnapPost/PostImages"
import { SnapPost } from "../../domain/SnapPost/SnapPost"
import { SnapPostDocument } from "../../scheme"
import { dateToTimestamp } from "../../libs/dateToTimestamp"
import { Snapshot } from "../_types"
import { LikedCount } from "../../domain/SnapPost/likedCount"
import { PostUser } from "../../domain/PostUser"

export const SnapPostConverter = {
  toFirestore: (post: SnapPost): DocumentData => {
    const documentData: SnapPostDocument = {
      title: post.title,
      comment: post.comment ?? null,
      postedAt: dateToTimestamp(post.postedAt),
      updatedAt: dateToTimestamp(post.updatedAt),
      longitude: post.longitude,
      latitude: post.latitude,
      postImages: post.postImages.map((image) => {
        return {
          imagePath: image.imagePath,
          tags: image.tags,
        }
      }),
      likedCount: post.likedCount.value,
      postedUser: {
        userId: post.postedUser.userId,
        name: post.postedUser.name,
        iconPath: post.postedUser.iconPath,
      },
    }
    return documentData
  },
  fromFirestore: (snapshot: Snapshot) => {
    const data = snapshot.data() as SnapPostDocument
    return new SnapPost(
      snapshot.id,
      data.title,
      data.comment ?? undefined,
      data.postedAt.toDate(),
      data.updatedAt.toDate(),
      data.longitude,
      data.latitude,
      data.postImages.map((postImage) => {
        return new PostImages(postImage.imagePath, postImage.tags)
      }),
      new LikedCount(data.likedCount),
      new PostUser(data.postedUser.userId, data.postedUser.name, data.postedUser.iconPath)
    )
  },
}
