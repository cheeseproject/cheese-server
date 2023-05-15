import { User } from "../../domain/User"
import { userRepository } from "../../repositories/User/UserRepository"
import { UserParams } from "./UserParams"

class UserService {
  private USER_NOT_FOUND_ERROR = "user not found"
  public save = async (params: UserParams, userId: string) => {
    const user = new User(userId, params.name, params.iconPath, new Date(), new Date())
    await userRepository.save(user)
  }

  public findById = async (userId: string) => {
    const user = await userRepository.findById(userId)
    if (!user) {
      throw new Error(this.USER_NOT_FOUND_ERROR)
    }
    return user
  }

  public update = async (params: UserParams, userId: string) => {
    const user = await userRepository.findById(userId)
    if (!user) {
      throw new Error(this.USER_NOT_FOUND_ERROR)
    }
    const updatedUser = user.updateProfile(params.name, params.iconPath)
    await userRepository.update(updatedUser)
  }
}

export const userService = new UserService()
