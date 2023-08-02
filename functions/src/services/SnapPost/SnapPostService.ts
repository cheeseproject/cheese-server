import { PostedUser } from "../../domain/PostedUser"
import { Coordinate } from "../../domain/SnapPost/Coordinate"
import { GeographicalRange } from "../../domain/SnapPost/GeographicalRange"
import { Latitude } from "../../domain/SnapPost/Latitude"
import { Longitude } from "../../domain/SnapPost/Longitude"
import { PostImages } from "../../domain/SnapPost/PostImages"
import { PostTag } from "../../domain/SnapPost/PostTag"
import { SnapPost } from "../../domain/SnapPost/SnapPost"
import { LikedCount } from "../../domain/SnapPost/likedCount"
import { Exception } from "../../libs/Exception"
import { generateId } from "../../libs/generateId"
import { likedSnapPostRepository } from "../../repositories/LikedSnapPost/LikedSnapPostRepository"
import { snapPostRepository } from "../../repositories/SnapPost/SnapPostRepository"
import { userRepository } from "../../repositories/User/UserRepository"
import { SnapPostParams, SnapPostUpdateParams } from "./SnapPostParams"

export class SnapPostService {
  public async save(params: SnapPostParams, userId: string): Promise<void> {
    const user = await userRepository.findById(userId)
    if (!user) {
      Exception.notFound("user")
    }
    const snapPost = this.createSnapPost(params, user.toPostUser())
    await snapPostRepository.save(snapPost)
  }

  public async findByUserId(userId: string): Promise<SnapPost[]> {
    const snapPosts = await snapPostRepository.findByUserId(userId)
    return snapPosts
  }

  public async findById(snapPostId: string): Promise<SnapPost> {
    const snapPost = await snapPostRepository.findById(snapPostId)
    if (!snapPost) {
      Exception.notFound("snap post")
    }
    return snapPost
  }

  public async findLikeIdByUserId(userId: string): Promise<SnapPost[]> {
    const snapPosts = await likedSnapPostRepository.findByUserId(userId)
    return snapPosts
  }

  public async findByRandomIndexesAndNotUserId(randomIndexes: number[], userId: string): Promise<SnapPost[]> {
    const snapPosts = await snapPostRepository.findByRandomIndexesAndNotUserId(randomIndexes, userId)
    return snapPosts
  }

  public async findByGeographyRange(userId: string, latitude: number, longitude: number): Promise<SnapPost[]> {
    const center = new Coordinate(new Latitude(latitude), new Longitude(longitude))
    const user = await userRepository.findById(userId)
    if (!user) {
      Exception.notFound("user")
    }
    const geographicalRange = new GeographicalRange(center, user.searchedRadiusInM)
    const geohashRanges = geographicalRange.bounds()
    const snapPosts = await snapPostRepository.findByGeohashRanges(geohashRanges)
    // NOTE: 偽陽性をフィルタリングと自分のもをフィルタリング
    return snapPosts.filter((snapPost) => {
      return snapPost.coordinate.isInRange(center, user.searchedRadiusInM) && !snapPost.isMine(userId)
    })
  }

  public async update(params: SnapPostUpdateParams, userId: string, snapPostId: string): Promise<void> {
    const snapPost = await snapPostRepository.findByIdAndUserId(userId, snapPostId)
    if (!snapPost) {
      Exception.notFound("snap post")
    }
    const editedSnapPost = snapPost.edited(params.title, params.comment)
    await snapPostRepository.update(editedSnapPost)
  }

  public async like(userId: string, snapPostIds: string[]): Promise<void> {
    const snapPosts = await snapPostRepository.findByIds(snapPostIds)

    snapPosts.forEach(async (snapPost) => {
      if (!snapPostIds.includes(snapPost.snapPostId)) return
      const likedSnapPost = snapPost.liked()
      await likedSnapPostRepository.save(userId, likedSnapPost)
    })
  }

  public async delete(userId: string, snapPostId: string): Promise<void> {
    const snapPost = await snapPostRepository.findByIdAndUserId(userId, snapPostId)
    if (!snapPost) {
      Exception.notFound("snap post")
    }
    await snapPostRepository.delete(snapPostId)
  }

  public async count(): Promise<number> {
    const count = await snapPostRepository.count()
    return count
  }

  private createSnapPost = (params: SnapPostParams, postedUser: PostedUser): SnapPost => {
    return new SnapPost(
      generateId(),
      params.title,
      params.comment,
      new Date(),
      new Date(),
      params.postImages.map((postImage) => {
        return new PostImages(postImage.imagePath)
      }),
      params.tags.map((tag) => {
        return new PostTag(tag)
      }),
      new LikedCount(0),
      postedUser,
      new Coordinate(new Latitude(params.latitude), new Longitude(params.longitude)),
      params.address
    )
  }
}

export const snapPostService = new SnapPostService()
