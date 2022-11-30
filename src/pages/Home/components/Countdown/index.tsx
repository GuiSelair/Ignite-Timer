import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'

import { CyclesContext } from '../../../../contexts/CyclesContext'
import { CountdownContainer, Separator } from './styles'

export const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    updateAmountSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minuteFormatted = String(minutesAmount).padStart(2, '0')
  const secondsFormatted = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const differenceSeconds = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (differenceSeconds > totalSeconds) {
          markCurrentCycleAsFinished()
          clearInterval(interval)
          updateAmountSecondsPassed(totalSeconds)
          return
        }

        updateAmountSecondsPassed(differenceSeconds)
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    markCurrentCycleAsFinished,
    updateAmountSecondsPassed,
  ])

  useEffect(() => {
    if (activeCycle) document.title = `${minuteFormatted}:${secondsAmount}`
    else document.title = 'Ignite Timer'
  }, [minuteFormatted, secondsAmount, activeCycle])

  return (
    <CountdownContainer>
      <span>{minuteFormatted.at(0)}</span>
      <span>{minuteFormatted.at(1)}</span>
      <Separator>:</Separator>
      <span>{secondsFormatted.at(0)}</span>
      <span>{secondsFormatted.at(1)}</span>
    </CountdownContainer>
  )
}
