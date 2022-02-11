const MINT_START_TIMESTAMP = 1644746400
const MINT_END_TIMESTAMP = 1644926340

export const isEarlyMint = () => {
  return getCurTimestampSeconds() < MINT_START_TIMESTAMP
}

export const isMintLive = () => {
  const t = getCurTimestampSeconds()
  return MINT_START_TIMESTAMP < t && t < MINT_END_TIMESTAMP
}

const getCurTimestampSeconds = () => {
  return new Date().getTime() / 1000
}
