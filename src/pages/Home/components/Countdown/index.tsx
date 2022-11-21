import { CountdownContainer, Separator } from './styles'

export const Countdown = () => {
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
