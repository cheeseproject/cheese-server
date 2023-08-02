import axios from "axios"
import { AddressRepository } from "./AddressRepository"
import { Coordinate } from "../../domain/SnapPost/Coordinate"
import { GeoRiversResult } from "./GeoRiversResult"
import { config } from "../../firebase/config"

export class AddressRepositoryImpl implements AddressRepository {
  private geoRiversUrl = "https://map.yahooapis.jp/geoapi/V1/reverseGeoCoder"

  public async getByCoordinate(coordinate: Coordinate): Promise<string | undefined> {
    const params = {
      appId: config.yahoo.api_key,
      lat: coordinate.latitude.value,
      lon: coordinate.longitude.value,
      output: "json",
    }
    const response = await axios.get<GeoRiversResult>(this.geoRiversUrl, { params })
    const feature = response.data.Feature
    return feature ? feature[0].Property.Address : undefined
  }
}

export const addressRepository = new AddressRepositoryImpl()
