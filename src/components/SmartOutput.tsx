import { createStyles, List, Theme, withStyles } from '@material-ui/core'
import { createWidget } from 'components/widgets/widgetFactory'
import { flow } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { Commands } from 'store/commands/interface'
import { commandsSelector } from 'store/commands/selectors'
import { App } from 'store/interface'
import { smartInputActionCreator } from 'store/ui/smartInput/actions'
import { Classes } from 'utils/styleUtils'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      overflow: 'scroll',
      border: '1px solid #aaaaaa20',
      borderRadius: 5,
      flexDirection: 'column-reverse',
    },
    list: {
      padding: theme.spacing.unit * 2,
    },
  })

interface StyleProps {
  classes: Classes<typeof styles>
}

interface StateProps {
  commands: Array<Commands.CommandData>
}

interface DispatchProps {
  editCommand: (command: Commands.CommandData) => void
  deleteCommand: (command: Commands.CommandData) => void
}

const SmartOutputCmp: React.SFC<StyleProps & StateProps & DispatchProps> = ({
  classes,
  commands,
  editCommand,
  deleteCommand,
}) => (
  <div className={classes.root}>
    <List className={classes.list}>
      {commands.map(command => (
        <div key={command.id}>
          {createWidget(command, {
            onEditClick: () => editCommand(command),
            onDeleteClick: () => deleteCommand(command),
          })}
        </div>
      ))}
    </List>
  </div>
)

export const SmartOutput = flow(
  connect<StateProps, DispatchProps, {}, App.State>(
    state => ({
      commands: commandsSelector.items(state),
    }),
    dispatch => ({
      editCommand: command => {
        const tokens = command.raw.split(' ')
        const input = tokens.slice(1, tokens.length).join(' ')
        const prefix = tokens[0]

        dispatch(smartInputActionCreator.setInput(input))
        dispatch(smartInputActionCreator.setFocus(true))
        dispatch(smartInputActionCreator.setPrefix(prefix))
      },
      deleteCommand: command => {
        dispatch(smartInputActionCreator.setInput(`delete transaction '${command.id}'`))
        dispatch(smartInputActionCreator.setFocus(true))
        dispatch(smartInputActionCreator.setPrefix(''))
      },
    })
  ),
  withStyles(styles)
)(SmartOutputCmp)
