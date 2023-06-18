import { User } from "../../domain/User"
import { Exception } from "../../libs/Exception"
import { userRepository } from "../../repositories/User/UserRepository"
import { UpdateUserParams, UserParams } from "./UserParams"

class UserService {
  public save = async (params: UserParams, userId: string) => {
    const user = await userRepository.findById(userId)
    if (user) {
      Exception.alreadyExists(`user: ${userId}`)
    }
    // NOTE: 初期値は5000m
    const defaultSearchRadiusInM = 5000
    const newUser = new User(userId, params.name, params.iconPath, new Date(), new Date(), defaultSearchRadiusInM)
    await userRepository.save(newUser)
  }

  public findById = async (userId: string) => {
    const user = await userRepository.findById(userId)
    if (!user) {
      Exception.notFound(`user: ${userId}`)
    }
    return user
  }

  public update = async (params: UpdateUserParams, userId: string) => {
    const user = await userRepository.findById(userId)
    if (!user) {
      Exception.notFound(`user: ${userId}`)
    }
    const updatedUser = user.edit(params.name, params.iconPath, params.searchedRadiusInM)
    await userRepository.update(updatedUser)
  }
}

export const userService = new UserService()
