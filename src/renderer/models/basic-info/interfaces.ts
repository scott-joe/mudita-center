export interface SimCard {
  readonly network: string
  readonly number: number
  readonly slot: 1 | 2
  readonly active: boolean
}

export interface MemorySpace {
  readonly free: number
  readonly full: number
}

export interface InitialState {
  readonly batteryLevel: number
  readonly changeSim: (card: SimCard) => void
  readonly disconnectDevice: () => void
  readonly networkName: string
  readonly osVersion: string
  readonly osUpdateDate: number
  readonly memorySpace: MemorySpace
  readonly lastBackup: string
  readonly loadData: () => void
  readonly simCards: SimCard[]
}
