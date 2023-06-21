export type SnapPostParams = {
  title: string
  comment?: string
  longitude: number
  latitude: number
  postImages: {
    imagePath: string
    tag: string
  }[]
}
