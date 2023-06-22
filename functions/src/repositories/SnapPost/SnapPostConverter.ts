import { DocumentData, GeoPoint } from "firebase-admin/firestore"
import { PostImages } from "../../domain/SnapPost/PostImages"
import { SnapPost } from "../../domain/SnapPost/SnapPost"
import { SnapPostChangeLogDocument, SnapPostDocument } from "../../scheme"
import { dateToTimestamp } from "../../libs/dateToTimestamp"
import { Snapshot } from "../_types"
import { LikedCount } from "../../domain/SnapPost/likedCount"
import { PostedUser } from "../../domain/PostedUser"
import { geohashForLocation } from "geofire-common"
import { Coordinate } from "../../domain/SnapPost/Coordinate"
import { Latitude } from "../../domain/SnapPost/Latitude"
import { Longitude } from "../../domain/SnapPost/Longitude"

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
        }
      }),
      tags: post.tags,
      likedCount: post.likedCount.value,
      postedUser: {
        userId: post.postedUser.userId,
        name: post.postedUser.name,
        iconPath: post.postedUser.iconPath,
      },
      randomIndex: null,
      coordinate: {
        geohash: geohashForLocation([post.coordinate.latitude.value, post.coordinate.longitude.value]),
        geopoint: new GeoPoint(post.coordinate.latitude.value, post.coordinate.longitude.value),
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
        return new PostImages(postImage.imagePath)
      }),
      data.tags,
      new LikedCount(data.likedCount),
      new PostedUser(data.postedUser.userId, data.postedUser.name, data.postedUser.iconPath),
      new Coordinate(new Latitude(data.coordinate.geopoint.latitude), new Longitude(data.coordinate.geopoint.longitude))
    )
  },
}

export const SnapPostChangeLogConverter = {
  toFirestore: (post: SnapPost): DocumentData => {
    const document: SnapPostChangeLogDocument = {
      title: post.title,
      comment: post.comment ?? null,
      updatedAt: dateToTimestamp(post.updatedAt),
    }
    return document
  },
}
