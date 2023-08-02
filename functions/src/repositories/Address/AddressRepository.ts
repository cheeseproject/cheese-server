import { Coordinate } from "../../domain/SnapPost/Coordinate"
export interface AddressRepository {
  getByCoordinate(coordinate: Coordinate): Promise<string | undefined>
}
