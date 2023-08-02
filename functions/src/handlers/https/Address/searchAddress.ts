import { Validator } from "../../Validator"
import { baseFunction } from "../../baseFunction"
import { addressService } from "../../../services/Address/AddressService"
import { z } from "zod"

const FetchAddress = z.object({
  latitude: z.number(),
  longitude: z.number(),
})

/**
 * 自分のユーザー情報を取得する
 */
export const searchAddress = baseFunction<{ address: string }>(async (data, context) => {
  Validator.auth(context)
  const params = Validator.scheme(data, FetchAddress)
  const address = await addressService.getByCoordinate(params.latitude, params.longitude)
  return { address }
})
