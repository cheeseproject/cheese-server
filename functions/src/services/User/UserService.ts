import { User } from "../../domain/User"
import { Exception } from "../../libs/Exception"
import { userRepository } from "../../repositories/User/UserRepository"
import { UserParams } from "./UserParams"

class UserService {
  public save = async (params: UserParams, userId: string) => {
    const user = await userRepository.findById(userId)
    if (user) {
      Exception.alreadyExists("user")
    }
    const newUser = new User(userId, params.name, params.iconPath, new Date(), new Date())
    await userRepository.save(newUser)
  }

  public findById = async (userId: string) => {
    const user = await userRepository.findById(userId)
    if (!user) {
      Exception.notFound("user")
    }
    return user
  }

  public update = async (params: UserParams, userId: string) => {
    const user = await userRepository.findById(userId)
    if (!user) {
      Exception.notFound("user")
    }
    const updatedUser = user.edit(params.name, params.iconPath)
    await userRepository.update(updatedUser)
  }
}

export const userService = new UserService()
