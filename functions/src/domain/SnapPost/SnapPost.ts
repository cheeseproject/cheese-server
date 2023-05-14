import { PostImages } from "./PostImages"
import { PostUser } from "../PostUser"
import { LikedCount } from "./likedCount"

export class SnapPost {
  constructor(
    readonly snapPostId: string,
    readonly title: string,
    readonly comment: string | undefined,
    readonly postedAt: Date,
    readonly updatedAt: Date,
    readonly longitude: number,
    readonly latitude: number,
    readonly postImages: PostImages[],
    readonly likedCount: LikedCount,
    readonly postedUser: PostUser
  ) {}
}
