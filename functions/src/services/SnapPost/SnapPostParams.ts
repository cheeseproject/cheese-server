export type SnapPostParams = {
  title: string
  comment: string | undefined
  longitude: number
  latitude: number
  postImages: {
    imagePath: string
    tags: string[]
  }[]
}
