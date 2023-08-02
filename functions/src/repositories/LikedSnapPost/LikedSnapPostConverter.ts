import { DocumentData, GeoPoint } from "firebase-admin/firestore"
import { PostImages } from "../../domain/SnapPost/PostImages"
import { SnapPost } from "../../domain/SnapPost/SnapPost"
import { likedSnapPostDocument } from "../../scheme"
import { dateToTimestamp } from "../../libs/dateToTimestamp"
import { Snapshot } from "../_types"
import { LikedCount } from "../../domain/SnapPost/likedCount"
import { PostedUser } from "../../domain/PostedUser"
import { Coordinate } from "../../domain/SnapPost/Coordinate"
import { geohashForLocation } from "geofire-common"
import { Latitude } from "../../domain/SnapPost/Latitude"
import { Longitude } from "../../domain/SnapPost/Longitude"
import { PostTag } from "../../domain/SnapPost/PostTag"

export const LikedSnapPostConverter = {
  toFirestore: (post: SnapPost): DocumentData => {
    const documentData: likedSnapPostDocument = {
      likedAt: dateToTimestamp(new Date()),
      snapPost: {
        snapPostId: post.snapPostId,
        title: post.title,
        comment: post.comment ?? null,
        postedAt: dateToTimestamp(post.postedAt),
        updatedAt: dateToTimestamp(post.updatedAt),
        postImages: post.postImages.map((image) => {
          return {
            imagePath: image.imagePath,
          }
        }),
        tags: post.tags.map((tag) => {
          return tag.value
        }),
        likedCount: post.likedCount.value,
        postedUser: {
          userId: post.postedUser.userId,
          name: post.postedUser.name,
          iconPath: post.postedUser.iconPath,
        },
        coordinate: {
          geohash: geohashForLocation([post.coordinate.latitude.value, post.coordinate.longitude.value]),
          geopoint: new GeoPoint(post.coordinate.latitude.value, post.coordinate.longitude.value),
        },
        address: post.address,
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
      snapPost.postImages.map((postImage) => {
        return new PostImages(postImage.imagePath)
      }),
      snapPost.tags.map((tag) => {
        return new PostTag(tag)
      }),
      new LikedCount(snapPost.likedCount),
      new PostedUser(snapPost.postedUser.userId, snapPost.postedUser.name, snapPost.postedUser.iconPath),
      new Coordinate(
        new Latitude(snapPost.coordinate.geopoint.latitude),
        new Longitude(snapPost.coordinate.geopoint.longitude)
      ),
      snapPost.address
    )
  },
}
