import {
  createContext,
  ReactNode,
  useCallback,
  useState,
  useReducer,
} from 'react'
import { ActionTypes, cyclesReducer, ICycle } from '../reducers/cycles'

interface ICreateCycleData {
  task: string
  minutesAmount: number
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
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { activeCycleId, cycles } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const markCurrentCycleAsFinished = useCallback(() => {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        activeCycleId,
      },
    })
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

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    })

    // reset()
    setAmountSecondsPassed(0)
  }, [])

  const interruptCycle = useCallback(() => {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: {
        activeCycleId,
      },
    })
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
