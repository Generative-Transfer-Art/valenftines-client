export enum HEART_FILL_COLOR {
  orange = '#ffcc99',
  blue = '#a2e2ff',
  green = '#a4ffca',
  pink = '#ffc9df',
  purple = '#dab5ff',
  yellow = '#fff6ae',
  white = '#ffffff',
}
export enum HEART_TEXT_COLOR {
  hotPink = '#fa0f95',
  white = '#ffffff',
}

export enum SupportedChainId {
  MAINNET = 1,
  RINKEBY = 4,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.MAINNET]: 'mainnet',
  [SupportedChainId.RINKEBY]: 'rinkeby',
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
  (id) => typeof id === 'number'
) as SupportedChainId[]
