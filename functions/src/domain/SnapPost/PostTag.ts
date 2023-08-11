export const POST_TAG: Record<string, string> = {
  natural: "NATURAL",
  building: "BUILDING",
  cultural: "CULTURAL",
  foodCulture: "FOOD_CULTURE",
  activity: "ACTIVITY",
  person: "PERSON",
  animal: "ANIMAL",
  other: "OTHER",
} as const

export class PostTag {
  constructor(readonly value: string) {
    if (!Object.values(POST_TAG).includes(value)) {
      throw new Error("invalid post tag")
    }
  }
}
