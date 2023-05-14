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
    // userRef: FirebaseFirestore.DocumentReference
    // userDocument
    name: string
    iconPath: string
    resistedAt: Timestamp
    updatedAt: Timestamp
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
export type LikedSnapPostDocument = {
  likedAt: Timestamp
  snapPostRef: FirebaseFirestore.DocumentReference
}

// sub collection of users
// id: snapPostId
export type DislikedSnapPostDocument = {
  dislikedAt: Timestamp
  snapPostRef: FirebaseFirestore.DocumentReference
}
