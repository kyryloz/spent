import { createStyles, List, StyleRulesCallback } from '@material-ui/core'
import * as React from 'react'
import { createConnect } from 'src/utils/reduxUtils'
import { Classes, createStyled } from 'src/utils/styleUtils'
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

const Connect = createConnect<App.State>({
  mapState: state => ({
    commands: commandsSelector.items(state),
  }),
})

export class SmartOutput extends React.PureComponent {
  render() {
    return (
      <Connect>
        {({ commands }: any) => (
          <Styled>
            {(classes: Classes<typeof styles>) => (
              <div className={classes.root}>
                <List component="nav" className={classes.list}>
                  {commands.map((command: any) => (
                    <div key={command.id}>{createWidget(command)}</div>
                  ))}
                </List>
              </div>
            )}
          </Styled>
        )}
      </Connect>
    )
  }
}
