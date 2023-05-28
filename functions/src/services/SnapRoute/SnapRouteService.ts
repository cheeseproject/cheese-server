import { SnapRoute } from "../../domain/SnapRoute/SnapRoute"
import { Exception } from "../../libs/Exception"
import { generateId } from "../../libs/generateId"
import { snapPostRepository } from "../../repositories/SnapPost/SnapPostRepository"
import { snapRouteRepository } from "../../repositories/SnapRoute/SnapRouteRepository"
import { SnapRouteParams, SnapRouteUpdateParams } from "./SnapRouteParams"

class SnapRouteService {
  public async save(params: SnapRouteParams, userId: string) {
    const snapPosts = await snapPostRepository.findByIds(params.snapPostIds)
    if (snapPosts.length !== params.snapPostIds.length) {
      Exception.notFound("snapPost")
    }
    const snapRoute = new SnapRoute(generateId(), params.title, userId, new Date(), new Date(), snapPosts)
    await snapRouteRepository.save(snapRoute)
  }

  public async findByUserId(userId: string): Promise<SnapRoute[]> {
    return await snapRouteRepository.findByUserId(userId)
  }

  public async findByIdAndUserId(userId: string, snapRouteId: string): Promise<SnapRoute> {
    const route = await snapRouteRepository.findByIdAndUserId(userId, snapRouteId)
    if (!route) {
      Exception.notFound("snapRoute")
    }
    return route
  }

  public async update(params: SnapRouteUpdateParams, userId: string) {
    const snapPosts = await snapPostRepository.findByIds(params.snapPostIds)
    if (snapPosts.length !== params.snapPostIds.length) {
      Exception.notFound("snapPost")
    }
    const snapRoute = await snapRouteRepository.findByIdAndUserId(userId, params.snapRouteId)

    if (!snapRoute) {
      Exception.notFound("snapRoute")
    }

    const updatedSnapRoute = snapRoute.edited(params.title, snapPosts)
    await snapRouteRepository.save(updatedSnapRoute)
  }

  public async delete(snapRouteId: string, userId: string) {
    const snapRoute = await snapRouteRepository.findByIdAndUserId(userId, snapRouteId)
    if (!snapRoute) {
      Exception.notFound("snapRoute")
    }
    await snapRouteRepository.delete(userId, snapRouteId)
  }
}

export const snapRouteService = new SnapRouteService()
