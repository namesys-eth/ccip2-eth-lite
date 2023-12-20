import iEnsLegacyRegistry from '../ABI/ENSLegacyRegistry.json'
import iEnsLegacyRegistrar from '../ABI/ENSLegacyRegistrar.json'
import iEnsLegacyResolver from '../ABI/ENSLegacyResolver.json'
import iEnsUniversalResolverGoerli from '../ABI/ENSUniversalResolverGoerli.json'
import iEnsPublicResolverMainnet from '../ABI/ENSPublicResolverMainnet.json'
import iEnsUniversalResolverMainnet from '../ABI/ENSUniversalResolverMainnet.json'
import iEnsWrapperGoerli from '../ABI/ENSWrapperGoerli.json'
import iEnsWrapperMainnet from '../ABI/ENSWrapperMainnet.json'
import iCCIP2Goerli from '../ABI/CCIP2Goerli.json'
import iCCIP2Mainnet from '../ABI/CCIP2Mainnet.json'
import { Alchemy, Network } from "alchemy-sdk"
import { ethers } from 'ethers'
import * as ensContent from '../utils/contenthash'
import axios from 'axios'

export const signedRecord = 'function signedRecord(address recordSigner, bytes memory recordSignature, bytes memory approvedSignature, bytes memory result)'
export const signedRedirect = 'function signedRedirect(address recordSigner, bytes memory recordSignature, bytes memory approvedSignature, bytes memory redirect)'
export const zeroAddress = '0x' + '0'.repeat(40)
export const zeroBytes = '0x' + '0'.repeat(64)
export const zeroKey = '0x' + '0'.repeat(64)
export const buffer = "\x19Ethereum Signed Message:\n"
export const ipnsPrefix = '0xe5010172002408011220'
export const httpPrefix = '0x6874'
const ipnsRegex = /^[a-z0-9]{62}$/
const ipfsRegexCID0 = /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/
const ipfsRegexCID1 = /^bafy[a-zA-Z0-9]{55}$/
const onionRegex = /^[a-z2-7]{16,56}$/
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
const hexRegex = /^[0-9a-fA-F]+$/
const githubRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/
const twitterRegex = /^[A-Za-z][A-Za-z0-9_]{0,14}$/
const zonehashRegex = /^0x[a-fA-F0-9]+$/
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const discordRegex = /^.{3,32}#[0-9]{4}$/
const farcasterRegex = /^[a-z0-9][a-z0-9-]{0,15}$/
const btcRegex = /^(1[a-km-zA-HJ-NP-Z1-9]{25,34})|(3[a-km-zA-HJ-NP-Z1-9]{25,34})|(bc1[a-zA-HJ-NP-Z0-9]{6,87})$/
const ltcRegex = /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/
const dogeRegex = /^D[5-9A-HJ-NP-U][1-9A-HJ-NP-Za-km-z]{24,33}$/
const solRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
const atomRegex = /^cosmos1[a-zA-Z0-9]{38}$/

// ENS Domain's Metadata
export const meta = {
  regOn: '',
  resolver: '',
  owner: '',
  manager: '',
  wrapped: false
}

let network = process.env.NEXT_PUBLIC_NETWORK
export const w3timestamp = 1699534314
export const alchemyConfig = {
  apiKey: network === 'goerli' ? process.env.NEXT_PUBLIC_ALCHEMY_ID_GOERLI : process.env.NEXT_PUBLIC_ALCHEMY_ID_MAINNET,
  network: network === 'goerli' ? Network.ETH_GOERLI : Network.ETH_MAINNET,
  chainId: network === 'goerli' ? '5' : '1',
}
export const alchemy = new Alchemy(alchemyConfig)
export const provider = new ethers.AlchemyProvider(network, alchemyConfig.apiKey)
export const ccip2 = [
  '0x19F83D2042962b163ED910eFCA5EDfed765A7e89', // CCIP2 Resolver Goerli
  '0x839B3B540A9572448FD1B2335e0EB09Ac1A02885' // CCIP2 Resolver Mainnet
]
export const defaultGateway = network === 'goerli' ? 'https://ccip.namesys.xyz/5' : 'https://ccip.namesys.xyz'
export const waitingPeriod = 1 * (network === 'goerli' ? 1 : 60) * 60 // 60 mins
export const ensContracts = [
  "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e", // Legacy Registry (Goerli & Mainnet)
  "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85", // Legacy Registrar (Goerli & Mainnet)
  "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63", // Public Legacy Resolver 1 (Mainnet)
  "0x114D4603199df73e7D157787f8778E21fCd13066", // Name Wrapper (Goerli)
  "0xd7a4F6473f32aC2Af804B3686AE8F1932bC35750", // Universal Resolver (Goerli)
  "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41", // Public Legacy Resolver 2 (Mainnet)
  "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63", // Universal Resolver (Mainnet)
  "0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401" // Name Wrapper (Mainnet)
]
export const ensInterface = [
  iEnsLegacyRegistry, // Legacy Registry (Goerli & Mainnet)
  iEnsLegacyRegistrar, // Legacy Registrar (Goerli & Mainnet)
  iEnsLegacyResolver, // Public Legacy Resolver 1 (Mainnet)
  iEnsWrapperGoerli, // Name Wrapper (Goerli)
  iEnsUniversalResolverGoerli, // Universal Resolver (Goerli)
  iEnsPublicResolverMainnet, // Public Legacy Resolver 2 (Mainnet)
  iEnsUniversalResolverMainnet, // Universal Resolver (Mainnet)
  iEnsWrapperMainnet // Name Wrapper (Mainnet)
]

export const ccip2Interface = [
  iCCIP2Goerli,
  iCCIP2Mainnet,
]
export const ensConfig = [
  {
    addressOrName: ensContracts[0],
    contractInterface: ensInterface[0]
  },
  {
    addressOrName: ensContracts[1],
    contractInterface: ensInterface[1]
  },
  {
    addressOrName: ensContracts[2],
    contractInterface: ensInterface[2]
  },
  {
    addressOrName: ensContracts[3],
    contractInterface: ensInterface[3]
  },
  {
    addressOrName: ensContracts[4],
    contractInterface: ensInterface[4]
  },
  {
    addressOrName: ensContracts[5],
    contractInterface: ensInterface[5]
  },
  {
    addressOrName: ensContracts[6],
    contractInterface: ensInterface[6]
  },
  {
    addressOrName: ensContracts[7],
    contractInterface: ensInterface[7]
  }
]
export const ccip2Config = [
  { // CCIP2 Resolver Goerli
    addressOrName: ccip2[0],
    contractInterface: ccip2Interface[0]
  },
  { // CCIP2 Resolver Mainnet
    addressOrName: ccip2[1],
    contractInterface: ccip2Interface[1]
  }
]

// ENS Domain's Records
export const records = {
  "contenthash": {
    id: 'Contenthash',
    value: '',
    type: 'contenthash',
    path: 'contenthash',
    loading: true
  },
  "addr": {
    id: 'Address',
    value: '',
    type: 'address',
    path: 'address/60',
    loading: true
  },
  "avatar": {
    id: 'Avatar',
    value: '',
    type: 'text',
    path: 'text/avatar',
    loading: true
  },
  "url": {
    id: 'URL',
    value: '',
    type: 'text',
    path: 'text/url',
    loading: true
  },
  "description": {
    id: 'Description',
    value: '',
    type: 'text',
    path: 'text/description',
    loading: true
  },
  "com.twitter": {
    id: 'X | Twitter',
    value: '',
    type: 'text',
    path: 'text/com.twitter',
    loading: true
  },
  "com.discord": {
    id: 'Discord',
    value: '',
    type: 'text',
    path: 'text/com.discord',
    loading: true
  }
}

// Truncate hex string
export function truncateHexString(hexString: string) {
  const prefix = hexString.slice(0, 2)
  const truncated = hexString.slice(2, 5) + '...' + hexString.slice(-3)
  return prefix + truncated
}

// Copy <input>
export function copyInput(element: string) {
  const copyText = document.getElementById(element) as HTMLInputElement
  copyText.select()
  copyText.setSelectionRange(0, 99999)
  navigator.clipboard.writeText(copyText.value).then(() => {
  }).catch((error) => {
    console.error('ERROR:', error)
  })
}

// Copy <span>
export function copyToClipboard(value: string, spanId: string) {
  const hiddenInput = document.createElement('input')
  hiddenInput.value = value
  document.body.appendChild(hiddenInput)
  hiddenInput.select()
  document.execCommand('copy')
  document.body.removeChild(hiddenInput)
  const spanElement = document.getElementById(spanId)
  if (spanElement) {
    spanElement.style.color = '#00ff40';
    // Reset the color after a delay (e.g., 2 seconds)
    setTimeout(() => {
      spanElement.style.color = 'lightgreen' // Reset to the default color
    }, 2000)
  }
}