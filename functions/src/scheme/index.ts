import { Timestamp } from "firebase-admin/firestore"

// root collection
// id: uid
export type UserDocument = {
  name: string
  iconPath: string
  resistedAt: Timestamp
  updatedAt: Timestamp
}

// root collection
// id: snapPostId
export type SnapPostDocument = {
  title: string
  comment: string | null
  postedAt: Timestamp
  updatedAt: Timestamp
  longitude: number
  latitude: number
  postImages: {
    imagePath: string
    tags: string[]
  }[]
  likedCount: number
  postedUser: {
    userId: string
    // userDocument
    name: string
    iconPath: string
  }
}

// sub collection of users
// id: snapRouteId
export type SnapRouteDocument = {
  title: string
  createdAt: Timestamp
  updatedAt: Timestamp
  snapPosts: {
    snapPostId: string
    snapPostRef: FirebaseFirestore.DocumentReference
  }[]
}

// sub collection of users
// id: snapPostId
export type likedSnapPostDocument = {
  likedAt: Timestamp
  // snapPostDocument
  snapPost: {
    title: string
    comment: string | null
    postedAt: Timestamp
    updatedAt: Timestamp
    longitude: number
    latitude: number
    postImages: {
      imagePath: string
      tags: string[]
    }[]
    likedCount: number
    postedUser: {
      userId: string
      // userDocument
      name: string
      iconPath: string
    }
  }
}

export type UpdateSnapPostLogDocument = {
  userId: string
  snapPostId: string
}
