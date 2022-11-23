import { createContext, ReactNode, useCallback, useState } from 'react'

interface ICreateCycleData {
  task: string
  minutesAmount: number
}

export interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface ICyclesContextType {
  cycles: ICycle[]
  activeCycle: ICycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  updateAmountSecondsPassed: (value: number) => void
  createNewCycle: (data: ICreateCycleData) => void
  interruptCycle: () => void
}

export const CyclesContext = createContext({} as ICyclesContextType)

interface ICycleContextProvider {
  children: ReactNode
}

export const CycleContextProvider = ({ children }: ICycleContextProvider) => {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const markCurrentCycleAsFinished = useCallback(() => {
    setCycles((oldCycles) =>
      oldCycles.map((cycle) => {
        if (activeCycleId === cycle.id) {
          return {
            ...cycle,
            finishedDate: new Date(),
          }
        }

        return cycle
      }),
    )
  }, [activeCycleId])

  const updateAmountSecondsPassed = useCallback((value: number) => {
    setAmountSecondsPassed(value)
  }, [])

  const createNewCycle = useCallback((data: ICreateCycleData) => {
    const newCycle: ICycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((old) => [...old, newCycle])
    setActiveCycleId(newCycle.id)

    // reset()
    setAmountSecondsPassed(0)
  }, [])

  const interruptCycle = useCallback(() => {
    setCycles((oldCycles) =>
      oldCycles.map((cycle) => {
        if (activeCycleId === cycle.id) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          }
        }

        return cycle
      }),
    )
    setActiveCycleId(null)
  }, [activeCycleId])

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        updateAmountSecondsPassed,
        interruptCycle,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
