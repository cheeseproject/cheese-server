import { GeohashRange, geohashQueryBounds } from "geofire-common"
import { Coordinate } from "./Coordinate"

export class GeographicalRange {
  constructor(readonly center: Coordinate, readonly radiusInM: number) {}

  public bounds(): GeohashRange[] {
    return geohashQueryBounds([this.center.latitude.value, this.center.longitude.value], this.radiusInM)
  }
}
