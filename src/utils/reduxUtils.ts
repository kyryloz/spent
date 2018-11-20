import { connect } from 'react-redux'

interface Mapper<State> {
  mapState: (state: State) => void
}

export const createConnect = <State>(mapper: Mapper<State>) => {
  const Connected = (props: any) => {
    const { children, ...connectedProps } = props

    return children(connectedProps)
  }

  return connect(mapper.mapState)(Connected)
}
