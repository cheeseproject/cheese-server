import { User } from "../../domain/User"
import { ProfileChangeLogDocument, references } from "../../scheme"
import { userConverter } from "./UserConverter"

export class UserRepository {
  public async save(user: User): Promise<void> {
    await references.users._userId(user.userId).ref.withConverter(userConverter).set(user)
  }

  public async findById(userId: string): Promise<User | undefined> {
    const snapshot = await references.users._userId(userId).ref.withConverter(userConverter).get()
    return snapshot.data()
  }

  public async update(user: User): Promise<void> {
    await this.save(user)
    await this.saveUserUpdateLog(user)
  }

  private async saveUserUpdateLog(user: User): Promise<void> {
    const documentData: ProfileChangeLogDocument = {
      name: user.name,
      iconPath: user.iconPath,
    }
    await references.users._userId(user.userId).profileChangeLogs.ref.add(documentData)
  }
}

export const userRepository = new UserRepository()
