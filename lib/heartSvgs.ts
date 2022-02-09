export const selectMessageHeartSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 162 162" xml:space="preserve">
    <g transform="translate(81,81)">
        <path d="M79.2-43C71.2-78.4,30.8-84.9,5-60.9c-2.5,2.3-6.4,2.1-8.8-0.3c-25-25.9-75.1-15-76.7,28.2C-82.6,22.3-14,75.2,1.5,75.1C17.3,75.1,91.3,10.7,79.2-43z" fill="none" stroke="black" stroke-dasharray="8" stroke-width="4px"/>
        <text style="fill:#FA0F95; text-anchor:middle; font-size:30px; font-family: monospace, monospace; font-weight: 500; letter-spacing: 2px;"><tspan x="0" y="-15">SELECT</tspan><tspan x="0" y="20">MSG</tspan></text>
    </g>
    </svg>
    `

export const sendToHeartSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 162 162" xml:space="preserve">
    <g transform="translate(81,81)">
        <path d="M79.2-43C71.2-78.4,30.8-84.9,5-60.9c-2.5,2.3-6.4,2.1-8.8-0.3c-25-25.9-75.1-15-76.7,28.2C-82.6,22.3-14,75.2,1.5,75.1C17.3,75.1,91.3,10.7,79.2-43z" fill="none" stroke="black" stroke-dasharray="8" stroke-width="4px"/>
        <text style="fill:#FA0F95; text-anchor:middle; font-size:30px; font-family: monospace, monospace; font-weight: 500; letter-spacing: 2px;"><tspan x="0" y="-15">SEND</tspan><tspan x="0" y="20">TO?</tspan></text>
    </g>
    </svg>
    `

export const addrHeartSVG = (address: string) => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 162 162" xml:space="preserve">
    <g transform="translate(81,81)">
        <path d="M79.2-43C71.2-78.4,30.8-84.9,5-60.9c-2.5,2.3-6.4,2.1-8.8-0.3c-25-25.9-75.1-15-76.7,28.2C-82.6,22.3-14,75.2,1.5,75.1C17.3,75.1,91.3,10.7,79.2-43z" fill="#fff"/>
        <text style="fill:#FA0F95; text-anchor:middle; font-size:30px; font-family: monospace, monospace; font-weight: 500; letter-spacing: 2px;"><tspan x="0" y="-10">${address}</tspan></text>
    </g></svg>
    
    `
}

export function getTextHeartSVG(heartType: number) {
  return heartType < 2
    ? bullishForYou()
    : heartType < 3
    ? beMine()
    : heartType < 4
    ? toTheMoon()
    : heartType < 5
    ? coolCat()
    : heartType < 6
    ? cutiePie()
    : heartType < 7
    ? zeroXZeroX()
    : heartType < 8
    ? bestFren()
    : heartType < 9
    ? bigFan()
    : heartType < 10
    ? gm()
    : heartType < 11
    ? coinBae()
    : heartType < 12
    ? sayIDAO()
    : heartType < 13
    ? wagmi()
    : heartType < 14
    ? myDegen()
    : heartType < 15
    ? payMyTaxes()
    : heartType < 16
    ? upOnly()
    : heartType < 17
    ? lilMfer()
    : heartType < 18
    ? onboardMe()
    : heartType < 19
    ? letsMerge()
    : heartType < 20
    ? hodlMe()
    : heartType < 21
    ? looksRare()
    : heartType < 22
    ? wenRing()
    : heartType < 23
    ? idMintYou()
    : simpForYou()
}

const zeroXZeroX = () => {
  return oneLineTextHeart('0x0x')
}

const gm = () => {
  return oneLineTextHeart('GM')
}

const wagmi = () => {
  return oneLineTextHeart('WAGMI')
}

const bullishForYou = () => {
  return twoLineTextHeart('BULLISH', '4YOU')
}

const beMine = () => {
  return twoLineTextHeart('BE', 'MINE')
}

const toTheMoon = () => {
  return twoLineTextHeart('2THE', 'MOON')
}

const coolCat = () => {
  return twoLineTextHeart('COOL', 'CAT')
}

const cutiePie = () => {
  return twoLineTextHeart('CUTIE', 'PIE')
}

const bestFren = () => {
  return twoLineTextHeart('BEST', 'FREN')
}

const bigFan = () => {
  return twoLineTextHeart('BIG', 'FAN')
}

const coinBae = () => {
  return twoLineTextHeart('COIN', 'BAE')
}

const sayIDAO = () => {
  return twoLineTextHeart('SAY I', 'DAO')
}

const myDegen = () => {
  return twoLineTextHeart('MY', 'DEGEN')
}

const payMyTaxes = () => {
  return twoLineTextHeart('PAY MY', 'TAXES')
}

const upOnly = () => {
  return twoLineTextHeart('UP', 'ONLY')
}

const lilMfer = () => {
  return twoLineTextHeart('LIL', 'MFER')
}

const onboardMe = () => {
  return twoLineTextHeart('ONBOARD', 'ME')
}

const letsMerge = () => {
  return twoLineTextHeart('LETS', 'MERGE')
}

const hodlMe = () => {
  return twoLineTextHeart('HODL', 'ME')
}

const looksRare = () => {
  return twoLineTextHeart('LOOKS', 'RARE')
}

const wenRing = () => {
  return twoLineTextHeart('WEN', 'RING')
}

const simpForYou = () => {
  return twoLineTextHeart('SIMP', '4U')
}

const idMintYou = () => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 162 162" xml:space="preserve">
    <g transform="translate(81,81)">
        <path d="M79.2-43C71.2-78.4,30.8-84.9,5-60.9c-2.5,2.3-6.4,2.1-8.8-0.3c-25-25.9-75.1-15-76.7,28.2C-82.6,22.3-14,75.2,1.5,75.1C17.3,75.1,91.3,10.7,79.2-43z" fill="#000000"/>
        <text style="fill:#ffffff; text-anchor:middle; font-size:30px; font-family: monospace, monospace; font-weight: 500; letter-spacing: 2px;"><tspan x="0" y="-25">ID</tspan><tspan x="0" y="10">MINT</tspan><tspan x="0" y="45">U</tspan></text>
    </g></svg>    
    `
}

const oneLineTextHeart = (text: string) => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 162 162" xml:space="preserve">
    <g transform="translate(81,81)">
        <path d="M79.2-43C71.2-78.4,30.8-84.9,5-60.9c-2.5,2.3-6.4,2.1-8.8-0.3c-25-25.9-75.1-15-76.7,28.2C-82.6,22.3-14,75.2,1.5,75.1C17.3,75.1,91.3,10.7,79.2-43z" fill="#000000"/>
        <text style="fill:#ffffff; text-anchor:middle; font-size:30px; font-family: monospace, monospace; font-weight: 500; letter-spacing: 2px;"><tspan x="0" y="-4">${text}</tspan></text>
    </g></svg>
    `
}

const twoLineTextHeart = (line1: string, line2: string) => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 162 162" xml:space="preserve">
    <g transform="translate(81,81)">
        <path d="M79.2-43C71.2-78.4,30.8-84.9,5-60.9c-2.5,2.3-6.4,2.1-8.8-0.3c-25-25.9-75.1-15-76.7,28.2C-82.6,22.3-14,75.2,1.5,75.1C17.3,75.1,91.3,10.7,79.2-43z" fill="#000000"/>
        <text style="fill:#ffffff; text-anchor:middle; font-size:30px; font-family: monospace, monospace; font-weight: 500; letter-spacing: 2px;"><tspan x="0" y="-15">${line1}</tspan><tspan x="0" y="20">${line2}</tspan></text>
    </g></svg>
    `
}
