import { PostedUser } from "./PostedUser"

export class User {
  constructor(
    readonly userId: string,
    readonly name: string,
    readonly iconPath: string,
    readonly resistedAt: Date,
    readonly updatedAt: Date
  ) {}

  public toPostUser(): PostedUser {
    return new PostedUser(this.userId, this.name, this.iconPath)
  }

  public edit(name: string, iconPath: string): User {
    return new User(this.userId, name, iconPath, this.resistedAt, new Date())
  }
}
