export class PostUser {
  constructor(
    readonly userId: string,
    readonly name: string,
    readonly iconPath: string,
    readonly resistedAt: Date,
    readonly updatedAt: Date
  ) {}
}
