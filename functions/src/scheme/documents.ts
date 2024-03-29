import { Timestamp } from "firebase-admin/firestore"

// root collection
// id: uid
export type UserDocument = {
  name: string
  iconPath: string
  searchedRadiusInM: number
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
  postImages: {
    imagePath: string
  }[]
  tags: string[]
  likedCount: number
  postedUser: {
    userId: string
    // userDocument
    name: string
    iconPath: string
  }
  randomIndex: number | null
  coordinate: {
    geohash: string
    geopoint: FirebaseFirestore.GeoPoint
  }
  address: string
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

  snapPost: {
    snapPostId: string
    // snapPostDocument
    title: string
    comment: string | null
    postedAt: Timestamp
    updatedAt: Timestamp
    postImages: {
      imagePath: string
    }[]
    tags: string[]
    likedCount: number
    postedUser: {
      userId: string
      // userDocument
      name: string
      iconPath: string
    }
    coordinate: {
      geohash: string
      geopoint: FirebaseFirestore.GeoPoint
    }
    address: string
  }
}

// sub collection of users
// id: randomId
export type ProfileChangeLogDocument = {
  name: string
  iconPath: string
}

// sub collection of SnapPosts
// id: randomId
export type SnapPostChangeLogDocument = {
  title: string
  comment: string | null
  updatedAt: Timestamp
}

// sub collection of SnapPosts
// id: randomId
export type SnapPostCreateLogDocument = {
  latestRandomIndex: number
}
