import { Timestamp } from "firebase-admin/firestore"

// root collection
export type UserDocument = {
  name: string
  iconPath: string
  resistedAt: Timestamp
  updatedAt: Timestamp
}

// root collection
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
  postedUser: {
    userId: string
    userRef: FirebaseFirestore.DocumentReference
    // userDocument
    name: string
    iconPath: string
    resistedAt: Timestamp
    updatedAt: Timestamp
  }
}

// sub collection of users
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
export type LikedSnapPostDocument = {
  likedAt: Timestamp
  snapPostId: string
  snapPostRef: FirebaseFirestore.DocumentReference
}

// sub collection of users
export type DislikedSnapPostDocument = {
  dislikedAt: Timestamp
  snapPostId: string
  snapPostRef: FirebaseFirestore.DocumentReference
}
