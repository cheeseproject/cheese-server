import { PostImages } from "./PostImages"
import { PostedUser } from "../PostedUser"
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
    readonly postedUser: PostedUser
  ) {}

  public edited(title: string, comment: string | undefined, postImages: PostImages[]): SnapPost {
    return new SnapPost(
      this.snapPostId,
      title,
      comment,
      this.postedAt,
      new Date(),
      this.longitude,
      this.latitude,
      postImages,
      this.likedCount,
      this.postedUser
    )
  }

  public liked(): SnapPost {
    return new SnapPost(
      this.snapPostId,
      this.title,
      this.comment,
      this.postedAt,
      this.updatedAt,
      this.longitude,
      this.latitude,
      this.postImages,
      this.likedCount.increment(),
      this.postedUser
    )
  }

  public isMine(userId: string): boolean {
    return this.postedUser.userId === userId
  }
}
