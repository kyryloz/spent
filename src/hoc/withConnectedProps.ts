import { connect } from 'react-redux'
import { Application } from '../store/interface'

export const withConnectedProps = <RequiredProps>(
  mapStateToProps: ((state: Application.State) => RequiredProps)
) => connect(mapStateToProps)
