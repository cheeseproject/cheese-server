import { SnapPost } from "../SnapPost/SnapPost"

export class SnapRoute {
  constructor(
    readonly snapRouteId: string,
    readonly title: string,
    readonly createdUserId: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly snapPosts: SnapPost[]
  ) {}

  public edited(title: string, snapPosts: SnapPost[]): SnapRoute {
    return new SnapRoute(this.snapRouteId, title, this.createdUserId, this.createdAt, new Date(), snapPosts)
  }
}
