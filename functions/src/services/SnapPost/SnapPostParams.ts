export type SnapPostParams = {
  title: string
  comment?: string
  longitude: number
  latitude: number
  postImages: {
    imagePath: string
  }[]
  tags: string[]
  address: string
}

export type SnapPostUpdateParams = {
  title: string
  comment?: string
}
