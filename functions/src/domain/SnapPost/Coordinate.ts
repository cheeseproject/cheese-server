import { distanceBetween } from "geofire-common"

export class Coordinate {
  constructor(public readonly longitude: number, public readonly latitude: number) {}

  public isInRange(center: Coordinate, radiusInM: number): boolean {
    const distanceInKm = distanceBetween([this.latitude, this.longitude], [center.latitude, center.longitude])
    const distanceInM = distanceInKm * 1000
    return distanceInM <= radiusInM
  }
}
