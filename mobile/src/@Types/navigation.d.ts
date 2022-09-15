export interface GameParams {
  id: string
  name: string
  imageUrl: string
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined
      description: GameParams
    }
  }
}
