/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function removeNulls(obj: any): any {
  if (obj === null) {
    return undefined
  }
  if (typeof obj === "object") {
    for (const key in obj) {
      obj[key] = removeNulls(obj[key])
    }
  }
  return obj
}
