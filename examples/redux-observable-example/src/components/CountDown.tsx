import React, { FC, useState, useEffect, useRef } from 'react'

export interface CountDownProps {
  isPinging: boolean
}

export const CountDown: FC<CountDownProps> = ({ isPinging }) => {
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef<any>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds(seconds => seconds + 1)
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (isPinging) {
      setSeconds(0)
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setSeconds(seconds => seconds + 1)
      }, 1000)
    }
  }, [isPinging])

  return <p>{seconds}s</p>
}
