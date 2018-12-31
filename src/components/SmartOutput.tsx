import { createStyles, List, Theme, withStyles } from '@material-ui/core'
import { createWidget } from 'components/widgets/widgetFactory'
import { flow } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { App } from 'store/interface'
import { CommandSelector } from 'store/model/cli/selectors'
import { dispatchDeleteAction, dispatchEditAction } from 'utils/editableActionUtils'
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
  commands: Array<CommandSelector.CommandItem>
}

interface DispatchProps {
  editCommand: (command: CommandSelector.CommandItem) => void
  deleteCommand: (command: CommandSelector.CommandItem) => void
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
      commands: CommandSelector.items(state),
    }),
    dispatch => ({
      editCommand: command => dispatchEditAction(dispatch, command),
      deleteCommand: command => dispatchDeleteAction(dispatch, command),
    })
  ),
  withStyles(styles)
)(SmartOutputCmp)
