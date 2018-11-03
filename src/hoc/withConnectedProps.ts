import { connect } from 'react-redux'
import { App } from '../store/interface'

export const withConnectedProps = <RequiredProps>(
  mapStateToProps: ((state: App.State) => RequiredProps)
) => connect(mapStateToProps)
