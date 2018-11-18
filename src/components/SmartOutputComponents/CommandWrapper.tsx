import { createStyles, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'
import * as React from 'react'
import { compose, pure, setDisplayName, withHandlers } from 'recompose'
import { formatTimestamp } from 'src/utils/dateUtils'
import { App } from '../../store/interface'
import { Dispatch } from 'redux'

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

function createStyled(styles: any, options?: any) {
  function Styled(props: any) {
    const { children, classes, theme } = props

    return children({
      classes,
      theme,
    })
  }

  const StyledWrapped = withStyles(styles, options)(Styled)

  return StyledWrapped
}

const Styled = createStyled(styles)

export const CommandWrapperView: React.SFC<Component.ViewProps> = ({
  rawCommand,
  timestamp,
  children,
}) => (
  <Styled styles={styles}>
    {({ classes }: any) => (
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

export class CommandWrapper extends React.PureComponent<Component.ComponentProps, {}> {
  render() {
    return <CommandWrapperView {...this.props} />
  }
}
