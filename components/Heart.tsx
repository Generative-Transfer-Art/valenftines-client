import React, { PropsWithChildren } from 'react'
import theme from 'styles/theme'

import styles from '../styles/Heart.module.scss'

interface BaseHeartProps {
  color?: string
  fill?: string
}

const TEXT_STYLE = {
  fontSize: '30px',
  fontFamily: 'Courier New, monospace',
  fontWeight: 600,
  letterSpacing: 'px',
}

function BaseHeart({ children, color = theme.white, fill = theme.black }: PropsWithChildren<BaseHeartProps>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 162 162"
      xmlSpace="preserve"
      className={styles.heart}
    >
      <g transform="translate(81,81)">
        <path
          d="M79.2-43C71.2-78.4,30.8-84.9,5-60.9c-2.5,2.3-6.4,2.1-8.8-0.3c-25-25.9-75.1-15-76.7,28.2C-82.6,22.3-14,75.2,1.5,75.1C17.3,75.1,91.3,10.7,79.2-43z"
          fill={fill}
        />
        <text fill={color} textAnchor="middle" style={TEXT_STYLE}>
          {children}
        </text>
      </g>
    </svg>
  )
}

export function ForFriendsAndLovers() {
  return (
    <BaseHeart fill={theme.purple} color={theme.hotPink}>
      <TwoLineText line1="4FRENS" line2="&LVRS" />
    </BaseHeart>
  )
}

export function ValeNFTines() {
  return (
    <BaseHeart fill={theme.yellow} color={theme.hotPink}>
      <ThreeLineText line1="VALE" line2="NFT" line3="INES" />
    </BaseHeart>
  )
}

export function Feb14Only() {
  return (
    <BaseHeart fill={theme.blue} color={theme.hotPink}>
      <TwoLineText line1="FEB14" line2="ONLY" />
    </BaseHeart>
  )
}

export function Gm() {
  return (
    <BaseHeart>
      <OneLineText line1="GM" />
    </BaseHeart>
  )
}

export function ZeroXZeroX() {
  return (
    <BaseHeart>
      <OneLineText line1="0x0x" />
    </BaseHeart>
  )
}

export function Wagmi() {
  return (
    <BaseHeart>
      <OneLineText line1="WAGMI" />
    </BaseHeart>
  )
}

export function Bullish4You() {
  return (
    <BaseHeart>
      <TwoLineText line1="BULLISH" line2="4YOU" />
    </BaseHeart>
  )
}

export function BeMine() {
  return (
    <BaseHeart>
      <TwoLineText line1="BE" line2="MINE" />
    </BaseHeart>
  )
}

export function ToTheMoon() {
  return (
    <BaseHeart>
      <TwoLineText line1="2THE" line2="MOON" />
    </BaseHeart>
  )
}

export function CoolCat() {
  return (
    <BaseHeart>
      <TwoLineText line1="COOL" line2="CAT" />
    </BaseHeart>
  )
}

export function CutiePie() {
  return (
    <BaseHeart>
      <TwoLineText line1="CUTIE" line2="PIE" />
    </BaseHeart>
  )
}

export function BestFren() {
  return (
    <BaseHeart>
      <TwoLineText line1="BEST" line2="FREN" />
    </BaseHeart>
  )
}

export function BigFan() {
  return (
    <BaseHeart>
      <TwoLineText line1="BIG" line2="FAN" />
    </BaseHeart>
  )
}

export function CoinBae() {
  return (
    <BaseHeart>
      <TwoLineText line1="COIN" line2="BAE" />
    </BaseHeart>
  )
}

export function SayIDAO() {
  return (
    <BaseHeart>
      <TwoLineText line1="SAY I" line2="DAO" />
    </BaseHeart>
  )
}

export function MyDegen() {
  return (
    <BaseHeart>
      <TwoLineText line1="MY" line2="DEGEN" />
    </BaseHeart>
  )
}

export function PayMyTaxes() {
  return (
    <BaseHeart>
      <TwoLineText line1="PAY MY" line2="TAXES" />
    </BaseHeart>
  )
}

export function UpOnly() {
  return (
    <BaseHeart>
      <TwoLineText line1="UP" line2="ONLY" />
    </BaseHeart>
  )
}

export function LilMfer() {
  return (
    <BaseHeart>
      <TwoLineText line1="LIL" line2="MFER" />
    </BaseHeart>
  )
}

export function CallMe() {
  return (
    <BaseHeart>
      <TwoLineText line1="CALL" line2="ME" />
    </BaseHeart>
  )
}

export function OnboardMe() {
  return (
    <BaseHeart>
      <TwoLineText line1="ONBOARD" line2="ME" />
    </BaseHeart>
  )
}

export function LetsMerge() {
  return (
    <BaseHeart>
      <TwoLineText line1="LETS" line2="MERGE" />
    </BaseHeart>
  )
}

export function HodlMe() {
  return (
    <BaseHeart>
      <TwoLineText line1="HODL" line2="ME" />
    </BaseHeart>
  )
}

export function LooksRare() {
  return (
    <BaseHeart>
      <TwoLineText line1="LOOKS" line2="RARE" />
    </BaseHeart>
  )
}

export function WenRing() {
  return (
    <BaseHeart>
      <TwoLineText line1="WEN" line2="RING" />
    </BaseHeart>
  )
}

export function SimpForYou() {
  return (
    <BaseHeart>
      <TwoLineText line1="SIMP" line2="4U" />
    </BaseHeart>
  )
}

export function IdMintYou() {
  return (
    <BaseHeart>
      <ThreeLineText line1="ID" line2="MINT" line3="YOU" />
    </BaseHeart>
  )
}

export const BACKGROUND_HEARTS = [
  Gm,
  ZeroXZeroX,
  Wagmi,
  Bullish4You,
  BeMine,
  ToTheMoon,
  CallMe,
  CoolCat,
  CutiePie,
  BestFren,
  BigFan,
  CoinBae,
  SayIDAO,
  MyDegen,
  PayMyTaxes,
  UpOnly,
  LilMfer,
  OnboardMe,
  LetsMerge,
  HodlMe,
  LooksRare,
  WenRing,
  SimpForYou,
  IdMintYou,
]

interface OneLineTextProps {
  line1: string
}
export function OneLineText({ line1 }: OneLineTextProps) {
  return (
    <>
      <tspan x="0" y="-10">
        {line1}
      </tspan>
    </>
  )
}
interface TwoLineTextProps extends OneLineTextProps {
  line2: string
}
export function TwoLineText({ line1, line2 }: TwoLineTextProps) {
  return (
    <>
      <tspan x="0" y="-15">
        {line1}
      </tspan>
      <tspan x="0" y="20">
        {line2}
      </tspan>
    </>
  )
}
interface ThreeLineTextProps extends TwoLineTextProps {
  line3: string
}
export function ThreeLineText({ line1, line2, line3 }: ThreeLineTextProps) {
  return (
    <>
      <tspan x="0" y="-25">
        {line1}
      </tspan>
      <tspan x="0" y="10">
        {line2}
      </tspan>
      <tspan x="0" y="45">
        {line3}
      </tspan>
    </>
  )
}
