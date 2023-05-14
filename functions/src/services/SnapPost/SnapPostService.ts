import { PostUser } from "../../domain/PostUser"
import { PostImages } from "../../domain/SnapPost/PostImages"
import { SnapPost } from "../../domain/SnapPost/SnapPost"
import { LikedCount } from "../../domain/SnapPost/likedCount"
import { generateId } from "../../libs/generateId"
import { snapPostRepository } from "../../repositories/SnapPost/SnapPostRepository"
import { userRepository } from "../../repositories/User/UserRepository"
import { SnapPostParams } from "./SnapPostParams"

export class SnapPostService {
  private USER_NOT_FOUND_ERROR = "user not found"
  public async save(params: SnapPostParams, userId: string): Promise<void> {
    const user = await userRepository.findById(userId)
    if (!user) {
      throw new Error(this.USER_NOT_FOUND_ERROR)
    }
    const snapPost = this.createSnapPost(params, user.toPostUser())
    await snapPostRepository.save(snapPost)
  }
  private createSnapPost = (params: SnapPostParams, postUser: PostUser) => {
    return new SnapPost(
      generateId(),
      params.title,
      params.comment,
      new Date(),
      new Date(),
      params.longitude,
      params.latitude,
      params.postImages.map((postImage) => {
        return new PostImages(postImage.imagePath, postImage.tags)
      }),
      new LikedCount(0),
      postUser
    )
  }
}

export const snapPostService = new SnapPostService()
