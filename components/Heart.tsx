import styles from 'styles/Hearts.module.scss'

export default function Heart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 200 200"
      xmlSpace="preserve"
      className={styles.heart}
    >
      <g transform="translate(100,100)">
        <path
          d="M79.2-43C71.2-78.4,30.8-84.9,5-60.9c-2.5,2.3-6.4,2.1-8.8-0.3c-25-25.9-75.1-15-76.7,28.2C-82.6,22.3-14,75.2,1.5,75.1
	C17.3,75.1,91.3,10.7,79.2-43z"
        />
        <text
          style={{
            fill: '#ffffff',
            textAnchor: 'middle',
            fontSize: '28px',
            fontFamily: 'monospace',
            fontWeight: '700',
            letterSpacing: '2px',
          }}
        >
          <tspan x="0" y="-10">
            WAGMI
          </tspan>
        </text>
      </g>
    </svg>
  )
}
