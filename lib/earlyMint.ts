import { toBuffer } from 'ethereumjs-util'

import MerkleTree from './merkleTree'
import { rinkebySnapshot, snapshot } from './snapshot'

const snapshotAddressesForEnv = (): string[] => {
  if (process.env.NEXT_PUBLIC_ENV == 'rinkeby') {
    return rinkebySnapshot.addresses
  }
  return snapshot.addresses
}

const BUFFER_ADDRESSES = snapshotAddressesForEnv().map((a) => toBuffer(a))
const MERKLE_TREE = new MerkleTree(BUFFER_ADDRESSES)

export const isEarlyMintEligble = (address: string): boolean => {
  return snapshotAddressesForEnv().includes(address.toLocaleLowerCase())
}

export const earlyMintProofForAddress = (address: string): string[] => {
  return MERKLE_TREE.getHexProof(toBuffer(address))
}
