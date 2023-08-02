export const POST_TAG: Record<string, string> = {
  natural: "NATURAL",
  cultural: "CULTURAL",
  foodCulture: "FOOD_CULTURE",
  activity: "ACTIVITY",
  person: "PERSON",
  animal: "ANIMAL",
  other: "OTHER",
} as const

export class PostTag {
  constructor(readonly value: string) {
    console.log(!Object.values(POST_TAG).includes(value))
    if (!Object.values(POST_TAG).includes(value)) {
      throw new Error("invalid post tag")
    }
  }
}
