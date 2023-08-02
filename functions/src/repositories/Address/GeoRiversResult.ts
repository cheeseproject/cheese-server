interface ResultInfo {
  Count: number
  Total: number
  Start: number
  Latency: number
  Status: number
  Description: string
  Copyright: string
  CompressType: string
}

interface Geometry {
  Type: string
  Coordinates: string
}

interface AddressElement {
  Name: string
  Kana: string
  Level: string
  Code?: string
}

interface Road {
  Name: string
  Kana: string
  PopularName?: string
}

interface Property {
  Country: {
    Code: string
    Name: string
  }
  Address: string
  AddressElement: AddressElement[]
  Road?: Road[]
}

interface Feature {
  Geometry: Geometry
  Property: Property
}

export interface GeoRiversResult {
  ResultInfo: ResultInfo
  Feature: Feature[]
}
