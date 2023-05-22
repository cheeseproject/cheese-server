import { User } from "../../domain/User"
import { db } from "../../firebase/config"
import { userConverter } from "./UserConverter"

export class UserRepository {
  private readonly collectionRef = db.collection("users")
  public async save(user: User): Promise<void> {
    await this.collectionRef.doc(user.userId).withConverter(userConverter).set(user)
  }

  public async findById(userId: string): Promise<User | undefined> {
    const snapshot = await this.collectionRef.doc(userId).withConverter(userConverter).get()
    return snapshot.data()
  }

  public async update(user: User): Promise<void> {
    await this.collectionRef.doc(user.userId).withConverter(userConverter).update(user)
  }
}

export const userRepository = new UserRepository()
