import { createStyles, Theme, Typography, WithStyles } from '@material-ui/core'
import * as React from 'react'
import { formatTimestamp } from 'src/utils/dateUtils'
import { createStyled } from 'src/utils/styleUtils'

namespace Component {
  export interface OutterProps {
    rawCommand: string
    timestamp: number
  }

  export interface HandlerProps {}

  export type ComponentProps = OutterProps

  export type ViewProps = OutterProps & HandlerProps
}

const styles = (theme: Theme) =>
  createStyles({
    textFieldInput: {
      fontFamily: '10',
    },
    root: {
      marginTop: theme.spacing.unit * 2,
    },
    body: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
    detailsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    date: {
      color: theme.colors.date,
    },
  })

const Styled = createStyled(styles)

export class CommandWrapper extends React.PureComponent<Component.ComponentProps, {}> {
  render() {
    const { rawCommand, timestamp, children } = this.props

    return (
      <Styled>
        {(classes: WithStyles<typeof styles>['classes']) => (
          <div className={classes.root}>
            <Typography gutterBottom variant={'body1'}>
              > {rawCommand}
            </Typography>
            <div className={classes.body}>
              <div className={classes.detailsContainer}>
                <div>{children}</div>
                <Typography className={classes.date}>{formatTimestamp(timestamp)}</Typography>
              </div>
            </div>
          </div>
        )}
      </Styled>
    )
  }
}
