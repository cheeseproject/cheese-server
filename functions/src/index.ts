export * from "./firebase/config"

export * from "./handlers/https/User"
export * from "./handlers/https/SnapPost"
export * from "./handlers/https/SnapRoute"

export * from "./handlers/event/User"
export * from "./handlers/event/SnapPost"
export * from "./handlers/event/LikedSnapPost"

import * as geofire from "geofire-common"
const lat = 51.5074
const lng = 0.1278
const hash = geofire.geohashForLocation([lat, lng])
console.log(hash)

const center: geofire.Geopoint = [51.5074, -0.1278999]
const radiusInM = 50 * 1

const bounds = geofire.geohashQueryBounds(center, radiusInM)
console.log(bounds)
