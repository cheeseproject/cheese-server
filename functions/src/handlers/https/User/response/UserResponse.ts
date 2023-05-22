import { z } from "zod"
import { User } from "../../../../domain/User"

export const UserResponseScheme = z.object({
  userId: z.string(),
  name: z.string(),
  iconPath: z.string(),
  resistedAt: z.date(),
  updatedAt: z.date(),
})

export type UserResponse = z.infer<typeof UserResponseScheme>

export const toUserResponse = (user: User): UserResponse => {
  const response: UserResponse = {
    userId: user.userId,
    name: user.name,
    iconPath: user.iconPath,
    resistedAt: user.resistedAt,
    updatedAt: user.updatedAt,
  }
  return response
}
