import { distanceBetween } from "geofire-common"
import { Latitude } from "./Latitude"
import { Longitude } from "./Longitude"

export class Coordinate {
  constructor(public readonly latitude: Latitude, public readonly longitude: Longitude) {}

  public isInRange(center: Coordinate, radiusInM: number): boolean {
    const distanceInKm = distanceBetween(
      [this.latitude.value, this.longitude.value],
      [center.latitude.value, center.longitude.value]
    )
    const distanceInM = distanceInKm * 1000
    return distanceInM <= radiusInM
  }
}
