import { DocumentData } from "firebase-admin/firestore"
import { PostImages } from "../../domain/SnapPost/PostImages"
import { SnapPost } from "../../domain/SnapPost/SnapPost"
import { likedSnapPostDocument } from "../../scheme"
import { dateToTimestamp } from "../../libs/dateToTimestamp"
import { Snapshot } from "../_types"
import { LikedCount } from "../../domain/SnapPost/likedCount"
import { PostUser } from "../../domain/PostUser"

export const LikedSnapPostConverter = {
  toFirestore: (post: SnapPost): DocumentData => {
    const documentData: likedSnapPostDocument = {
      likedAt: dateToTimestamp(new Date()),
      snapPost: {
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
      },
    }
    return documentData
  },
  fromFirestore: (snapshot: Snapshot) => {
    const data = snapshot.data() as likedSnapPostDocument
    const snapPost = data.snapPost
    return new SnapPost(
      snapshot.id,
      snapPost.title,
      snapPost.comment ?? undefined,
      snapPost.postedAt.toDate(),
      snapPost.updatedAt.toDate(),
      snapPost.longitude,
      snapPost.latitude,
      snapPost.postImages.map((postImage) => {
        return new PostImages(postImage.imagePath, postImage.tags)
      }),
      new LikedCount(snapPost.likedCount),
      new PostUser(snapPost.postedUser.userId, snapPost.postedUser.name, snapPost.postedUser.iconPath)
    )
  },
}
