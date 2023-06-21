import { DocumentData } from "firebase-admin/firestore"
import { PostImages } from "../../domain/SnapPost/PostImages"
import { SnapPost } from "../../domain/SnapPost/SnapPost"
import { SnapPostChangeLogDocument, SnapPostDocument } from "../../scheme"
import { dateToTimestamp } from "../../libs/dateToTimestamp"
import { Snapshot } from "../_types"
import { LikedCount } from "../../domain/SnapPost/likedCount"
import { PostedUser } from "../../domain/PostedUser"
import { geohashForLocation } from "geofire-common"
import { Coordinate } from "../../domain/SnapPost/Coordinate"

export const SnapPostConverter = {
  toFirestore: (post: SnapPost): DocumentData => {
    const documentData: SnapPostDocument = {
      title: post.title,
      comment: post.comment ?? null,
      postedAt: dateToTimestamp(post.postedAt),
      updatedAt: dateToTimestamp(post.updatedAt),
      postImages: post.postImages.map((image) => {
        return {
          imagePath: image.imagePath,
          tag: image.tag,
        }
      }),
      likedCount: post.likedCount.value,
      postedUser: {
        userId: post.postedUser.userId,
        name: post.postedUser.name,
        iconPath: post.postedUser.iconPath,
      },
      randomIndex: null,
      coordinate: {
        geohash: geohashForLocation([post.coordinate.latitude, post.coordinate.longitude]),
        geopoint: new FirebaseFirestore.GeoPoint(post.coordinate.latitude, post.coordinate.longitude),
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
      data.postImages.map((postImage) => {
        return new PostImages(postImage.imagePath, postImage.tag)
      }),
      new LikedCount(data.likedCount),
      new PostedUser(data.postedUser.userId, data.postedUser.name, data.postedUser.iconPath),
      new Coordinate(data.coordinate.geopoint.longitude, data.coordinate.geopoint.latitude)
    )
  },
}

export const SnapPostChangeLogConverter = {
  toFirestore: (post: SnapPost): DocumentData => {
    const document: SnapPostChangeLogDocument = {
      title: post.title,
      comment: post.comment ?? null,
      updatedAt: dateToTimestamp(post.updatedAt),
      postImages: post.postImages.map((image) => {
        return {
          imagePath: image.imagePath,
          tag: image.tag,
        }
      }),
      coordinate: {
        geohash: geohashForLocation([post.coordinate.latitude, post.coordinate.longitude]),
        geopoint: new FirebaseFirestore.GeoPoint(post.coordinate.latitude, post.coordinate.longitude),
      },
    }
    return document
  },
}
