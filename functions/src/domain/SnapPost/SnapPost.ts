import { PostImages } from "./PostImages"
import { PostedUser } from "../PostedUser"
import { LikedCount } from "./likedCount"
import { Coordinate } from "./Coordinate"
import { PostTag } from "./PostTag"

export class SnapPost {
  constructor(
    readonly snapPostId: string,
    readonly title: string,
    readonly comment: string | undefined,
    readonly postedAt: Date,
    readonly updatedAt: Date,
    readonly postImages: PostImages[],
    readonly tags: PostTag[],
    readonly likedCount: LikedCount,
    readonly postedUser: PostedUser,
    readonly coordinate: Coordinate,
    readonly address: string
  ) {}

  public edited(title: string, comment: string | undefined): SnapPost {
    return new SnapPost(
      this.snapPostId,
      title,
      comment,
      this.postedAt,
      new Date(),
      this.postImages,
      this.tags,
      this.likedCount,
      this.postedUser,
      this.coordinate,
      this.address
    )
  }

  public liked(): SnapPost {
    return new SnapPost(
      this.snapPostId,
      this.title,
      this.comment,
      this.postedAt,
      this.updatedAt,
      this.postImages,
      this.tags,
      this.likedCount.increment(),
      this.postedUser,
      this.coordinate,
      this.address
    )
  }

  public isMine(userId: string): boolean {
    return this.postedUser.userId === userId
  }
}
