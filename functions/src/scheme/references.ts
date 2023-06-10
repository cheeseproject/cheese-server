import { db } from "../firebase/config"

export const references = {
  users: {
    ref: db.collection("users"),

    _userId: (userId: string) => {
      return {
        ref: db.collection("users").doc(userId),

        profileChangeLogs: {
          ref: db.collection("users").doc(userId).collection("profileChangeLogs"),
          _profileChangeLogsId: (profileChangeLogId: string) => {
            return {
              ref: db.collection("users").doc(userId).collection("profileChangeLogs").doc(profileChangeLogId),
            }
          },
        },

        snapRoutes: {
          ref: db.collection("users").doc(userId).collection("snapRoutes"),
          _snapRoutesId: (snapRouteId: string) => {
            return {
              ref: db.collection("users").doc(userId).collection("snapRoutes").doc(snapRouteId),
            }
          },
        },

        likedSnapPosts: {
          ref: db.collection("users").doc(userId).collection("likedSnapPosts"),
          _likedSnapPostsId: (likedSnapPostId: string) => {
            return {
              ref: db.collection("users").doc(userId).collection("likedSnapPosts").doc(likedSnapPostId),
            }
          },
        },
      }
    },
  },

  snapPosts: {
    ref: db.collection("snapPosts"),
    _snapPostsId: (snapPostId: string) => {
      return {
        ref: db.collection("snapPosts").doc(snapPostId),
      }
    },
  },

  snapRoutes: {
    ref: db.collection("snapRoutes"),
    _snapRoutesId: (snapRouteId: string) => {
      return {
        ref: db.collection("snapRoutes").doc(snapRouteId),
      }
    },
  },
}
