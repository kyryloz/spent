import { createStyles, List, StyleRulesCallback } from '@material-ui/core'
import * as React from 'react'
import { connect } from 'react-redux'
import { Classes, createStyled } from 'src/utils/styleUtils'
import { Commands } from '../store/commands/interface'
import { commandsSelector } from '../store/commands/selectors'
import { App } from '../store/interface'
import { createWidget } from './SmartOutputComponents/widgetFactory'

const styles: StyleRulesCallback = theme =>
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

const Styled = createStyled(styles)

interface Props {
  commands: Array<Commands.CommandData>
}

class SmartOutputCmp extends React.PureComponent<Props> {
  render() {
    const { commands } = this.props

    return (
      <Styled>
        {(classes: Classes<typeof styles>) => (
          <div className={classes.root}>
            <List component="nav" className={classes.list}>
              {commands.map(command => (
                <div key={command.id}>{createWidget(command)}</div>
              ))}
            </List>
          </div>
        )}
      </Styled>
    )
  }
}

const mapStateToProps = (state: App.State) => ({
  commands: commandsSelector.items(state),
})

export const SmartOutput = connect(mapStateToProps)(SmartOutputCmp)
