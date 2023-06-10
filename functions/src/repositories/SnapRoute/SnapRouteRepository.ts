import { FieldPath } from "firebase-admin/firestore"
import { SnapPost } from "../../domain/SnapPost/SnapPost"
import { SnapRoute } from "../../domain/SnapRoute/SnapRoute"
import { SnapRouteDocument } from "../../scheme"
import { SnapPostConverter } from "../SnapPost/SnapPostConverter"
import { snapRouteConverter } from "./SnapRouteConverter"
import { references } from "../../scheme/references"

class SnapRouteRepository {
  public async save(snapRoute: SnapRoute): Promise<void> {
    await references.users
      ._userId(snapRoute.createdUserId)
      .snapRoutes._snapRoutesId(snapRoute.snapRouteId)
      .ref.set(snapRouteConverter.toFirestore(snapRoute))
  }

  public async findByUserId(userId: string): Promise<SnapRoute[]> {
    const snapshot = (await references.users
      ._userId(userId)
      .snapRoutes.ref.get()) as FirebaseFirestore.QuerySnapshot<SnapRouteDocument>
    const snapRoutes: SnapRoute[] = []

    for (const doc of snapshot.docs) {
      const snapRoute = await this.findByIdAndUserId(userId, doc.id)
      if (snapRoute) snapRoutes.push(snapRoute)
    }
    return snapRoutes
  }

  public async findByIdAndUserId(userId: string, snapRouteId: string): Promise<SnapRoute | undefined> {
    const snapshot = await references.users._userId(userId).snapRoutes._snapRoutesId(snapRouteId).ref.get()

    // NOTE: JOINがしたいので、Converterが使えない
    const date = snapshot.data() as SnapRouteDocument
    if (!date) return undefined

    const snapPostIds = date.snapPosts.map((snapPost) => {
      return snapPost.snapPostId
    })

    const snapPosts = await this.findSnapPostByIds(snapPostIds)

    return new SnapRoute(snapshot.id, date.title, userId, date.createdAt.toDate(), date.updatedAt.toDate(), snapPosts)
  }

  public async delete(userId: string, snapRouteId: string): Promise<void> {
    await references.users._userId(userId).snapRoutes._snapRoutesId(snapRouteId).ref.delete()
  }

  private async findSnapPostByIds(snapPostIds: string[]): Promise<SnapPost[]> {
    const snapshot = await references.snapPosts.ref
      .where(FieldPath.documentId(), "in", snapPostIds)
      .withConverter(SnapPostConverter)
      .get()
    return snapshot.docs.map((doc) => doc.data())
  }
}

export const snapRouteRepository = new SnapRouteRepository()
