import React, { FC, useState } from 'react'

export interface PingPongProps {
  isPinging: boolean
  sendPing: (delay: number) => void
}

export const PingPong: FC<PingPongProps> = ({ isPinging, sendPing }) => {
  const [delay, setDelay] = useState(1000)

  return (
    <>
      <h1>isPinging: {isPinging ? 'true' : 'false'}</h1>
      <label>
        Delay:{' '}
        <input
          type="number"
          value={delay}
          onChange={e => setDelay(Number(e.currentTarget.value) || 1000)}
        />
      </label>{' '}
      <button onClick={() => sendPing(delay)} disabled={isPinging}>
        Send PING
      </button>
    </>
  )
}
