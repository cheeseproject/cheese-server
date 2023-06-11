import { z } from "zod"

export const SnapPostCountResponseScheme = z.object({
  count: z.number(),
})

export type SnapPostCountResponse = z.infer<typeof SnapPostCountResponseScheme>

export const toSnapPostCountResponse = (count: number): SnapPostCountResponse => {
  return { count }
}
