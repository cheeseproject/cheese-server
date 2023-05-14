import { PostUser } from "./PostUser"

export class User {
  constructor(
    readonly userId: string,
    readonly name: string,
    readonly iconPath: string,
    readonly resistedAt: Date,
    readonly updatedAt: Date
  ) {}

  public toPostUser(): PostUser {
    return new PostUser(this.userId, this.name, this.iconPath, this.resistedAt, this.updatedAt)
  }
}
