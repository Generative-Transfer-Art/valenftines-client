export function mintCostETH(heartType: number) {
  return heartType < 1 ? 0 : heartType < 11 ? 0.01 : heartType < 18 ? 0.02 : heartType < 23 ? 0.1 : 1
}
