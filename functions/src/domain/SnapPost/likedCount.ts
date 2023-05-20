export class LikedCount {
  constructor(readonly value: number) {
    if (value < 0) {
      throw new Error("LikedCount must be greater than or equal to 0.")
    }
  }
  public increment(): LikedCount {
    return new LikedCount(this.value + 1)
  }
}
