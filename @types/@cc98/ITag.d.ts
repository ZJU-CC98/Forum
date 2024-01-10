declare module '@cc98/api' {
  export interface ITag {
    id: number
    name: string
  }

  export interface ITagGroup {
    layer: number
    tags: ITag[]
  }
}
