import { connect } from 'react-redux'
import { App } from '../store/interface'

export const withConnectedProps = <RequiredProps, OwnProps = {}>(
  mapStateToProps: ((state: App.State, ownProps: OwnProps) => RequiredProps)
) => connect(mapStateToProps)
