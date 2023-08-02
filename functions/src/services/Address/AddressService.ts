import { Coordinate } from "../../domain/SnapPost/Coordinate"
import { Latitude } from "../../domain/SnapPost/Latitude"
import { Longitude } from "../../domain/SnapPost/Longitude"
import { Exception } from "../../libs/Exception"
import { addressRepository } from "../../repositories/Address/AddressRepositoryImpl"

class AddressService {
  async getByCoordinate(latitude: number, longitude: number): Promise<string> {
    const coordinate = new Coordinate(new Latitude(latitude), new Longitude(longitude))
    const address = await addressRepository.getByCoordinate(coordinate)
    if (!address) {
      Exception.notFound("address")
    }
    return address
  }
}

export const addressService = new AddressService()
