import React, { PropsWithChildren } from 'react'
import theme from 'styles/theme'

import styles from './Heart.module.scss'

interface BaseHeartProps {
  classes?: string[]
  color?: string
  fill?: string
  strokeDasharray?: number
  stroke?: string
  strokeWidth?: number
  onClick?: () => void
}

const TEXT_STYLE = {
  fontSize: '30px',
  fontFamily: 'monospace',
  fontWeight: 500,
  letterSpacing: '1px',
}

function BaseHeart({
  classes = [],
  children,
  color = theme.white,
  fill = theme.black,
  strokeDasharray = 0,
  stroke = theme.none,
  strokeWidth = 0,
  onClick,
}: PropsWithChildren<BaseHeartProps>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 162 162"
      xmlSpace="preserve"
      className={classes.join(' ')}
      onClick={onClick}
    >
      <g transform="translate(81,81)">
        <path
          d="M79.2-43C71.2-78.4,30.8-84.9,5-60.9c-2.5,2.3-6.4,2.1-8.8-0.3c-25-25.9-75.1-15-76.7,28.2C-82.6,22.3-14,75.2,1.5,75.1C17.3,75.1,91.3,10.7,79.2-43z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
        />
        <text fill={color} textAnchor="middle" style={TEXT_STYLE}>
          {children}
        </text>
      </g>
    </svg>
  )
}

export function ForFriendsAndLovers(props: BaseHeartProps) {
  return (
    <BaseHeart
      {...props}
      fill={theme.purple}
      color={theme.hotPink}
      classes={[styles.float, ...(props.classes ? props.classes : [])]}
    >
      <TwoLineText line1="4FRENS" line2="&LVRS" />
    </BaseHeart>
  )
}

export function ValeNFTines(props: BaseHeartProps) {
  return (
    <BaseHeart
      {...props}
      fill={theme.yellow}
      color={theme.hotPink}
      classes={[styles.float, ...(props.classes ? props.classes : [])]}
    >
      <ThreeLineText line1="VALE" line2="NFT" line3="INES" />
    </BaseHeart>
  )
}

export function Feb14Only(props: BaseHeartProps) {
  return (
    <BaseHeart
      {...props}
      fill={theme.blue}
      color={theme.hotPink}
      classes={[styles.float, ...(props.classes ? props.classes : [])]}
    >
      <TwoLineText line1="FEB14" line2="ONLY" />
    </BaseHeart>
  )
}

export function Gm(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <OneLineText line1="GM" />
    </BaseHeart>
  )
}

export function ZeroXZeroX(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <OneLineText line1="0x0x" />
    </BaseHeart>
  )
}

export function Wagmi(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <OneLineText line1="WAGMI" />
    </BaseHeart>
  )
}

export function Bullish4You(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="BULLISH" line2="4YOU" />
    </BaseHeart>
  )
}

export function BeMine(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="BE" line2="MINE" />
    </BaseHeart>
  )
}

export function ToTheMoon(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="2THE" line2="MOON" />
    </BaseHeart>
  )
}

export function CoolCat(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="COOL" line2="CAT" />
    </BaseHeart>
  )
}

export function CutiePie(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="CUTIE" line2="PIE" />
    </BaseHeart>
  )
}

export function BestFren(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="BEST" line2="FREN" />
    </BaseHeart>
  )
}

export function BigFan(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="BIG" line2="FAN" />
    </BaseHeart>
  )
}

export function CoinBae(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="COIN" line2="BAE" />
    </BaseHeart>
  )
}

export function SayIDAO(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="SAY I" line2="DAO" />
    </BaseHeart>
  )
}

export function MyDegen(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="MY" line2="DEGEN" />
    </BaseHeart>
  )
}

export function PayMyTaxes(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="PAY MY" line2="TAXES" />
    </BaseHeart>
  )
}

export function UpOnly(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="UP" line2="ONLY" />
    </BaseHeart>
  )
}

export function LilMfer(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="LIL" line2="MFER" />
    </BaseHeart>
  )
}

export function CallMe(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="CALL" line2="ME" />
    </BaseHeart>
  )
}

export function OnboardMe(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="ONBOARD" line2="ME" />
    </BaseHeart>
  )
}

export function LetsMerge(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="LETS" line2="MERGE" />
    </BaseHeart>
  )
}

export function HodlMe(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="HODL" line2="ME" />
    </BaseHeart>
  )
}

export function LooksRare(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="LOOKS" line2="RARE" />
    </BaseHeart>
  )
}

export function WenRing(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="WEN" line2="RING" />
    </BaseHeart>
  )
}

export function SimpForYou(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
      <TwoLineText line1="SIMP" line2="4U" />
    </BaseHeart>
  )
}

export function IdMintYou(props: BaseHeartProps) {
  return (
    <BaseHeart {...props}>
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

export function SelectMessageHeart({ classes = [] }: { classes: string[] }) {
  return (
    <BaseHeart
      classes={[styles.interactive, ...classes]}
      fill={theme.none}
      color={theme.hotPink}
      strokeDasharray={8}
      stroke={theme.black}
      strokeWidth={4}
    >
      <TwoLineText line1={'SELECT'} line2={'MSG'} />
    </BaseHeart>
  )
}

export function SendToHeart({ onClick, classes = [] }: { classes?: string[]; onClick?: () => void }) {
  return (
    <BaseHeart
      classes={[onClick ? styles.interactive : '', ...classes]}
      fill={theme.none}
      color={theme.hotPink}
      strokeDasharray={8}
      stroke={theme.black}
      strokeWidth={4}
      onClick={onClick}
    >
      <TwoLineText line1={'SEND'} line2={'TO?'} />
    </BaseHeart>
  )
}

export function ConnectHeart({ onClick, classes = [] }: { classes?: string[]; onClick?: () => void }) {
  return (
    <BaseHeart
      classes={[styles.interactive, ...classes]}
      fill={theme.none}
      color={theme.hotPink}
      strokeDasharray={8}
      stroke={theme.black}
      strokeWidth={4}
      onClick={onClick}
    >
      <OneLineText line1={'CONNECT'} />
    </BaseHeart>
  )
}

interface AddressHeartProps {
  address: string
  classes?: string[]
}

export function AddressHeart({ address, classes = [] }: AddressHeartProps) {
  return (
    <BaseHeart fill={theme.white} color={theme.hotPink} classes={classes}>
      <OneLineText line1={address} />
    </BaseHeart>
  )
}

interface TextHeartProps extends BaseHeartProps {
  heartType: number
}

export function TextHeart({ heartType, ...rest }: TextHeartProps) {
  switch (heartType) {
    case 1:
      return <Bullish4You {...rest} />
    case 2:
      return <BeMine {...rest} />
    case 3:
      return <ToTheMoon {...rest} />
    case 4:
      return <CoolCat {...rest} />
    case 5:
      return <CutiePie {...rest} />
    case 6:
      return <ZeroXZeroX {...rest} />
    case 7:
      return <BestFren {...rest} />
    case 8:
      return <BigFan {...rest} />
    case 9:
      return <Gm {...rest} />
    case 10:
      return <CoinBae {...rest} />
    case 11:
      return <SayIDAO {...rest} />
    case 12:
      return <Wagmi {...rest} />
    case 13:
      return <MyDegen {...rest} />
    case 14:
      return <PayMyTaxes {...rest} />
    case 15:
      return <UpOnly {...rest} />
    case 16:
      return <LilMfer {...rest} />
    case 17:
      return <OnboardMe {...rest} />
    case 18:
      return <LetsMerge {...rest} />
    case 19:
      return <HodlMe {...rest} />
    case 20:
      return <LooksRare {...rest} />
    case 21:
      return <WenRing {...rest} />
    case 22:
      return <IdMintYou {...rest} />
    case 23:
    default:
      return <SimpForYou {...rest} />
  }
}
