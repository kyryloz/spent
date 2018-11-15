import { createStyles, Theme, Typography, withStyles, WithStyles } from '@material-ui/core'
import { toPairs } from 'lodash'
import * as React from 'react'
import { compose, pure, setDisplayName, withHandlers } from 'recompose'
import { categoriesSelector } from 'src/store/categories/selectors'
import { Commands } from 'src/store/commands/interface'
import { withConnectedProps } from '../../hoc/withConnectedProps'
import { App } from '../../store/interface'

interface OutterProps {
  command: Commands.StatusData
}

interface ConnectedProps {
  categories: {
    [name: string]: number
  }
}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {}

interface HandlerProps {}

type ViewProps = OutterProps & InnerProps & HandlerProps

const styles = (theme: Theme) =>
  createStyles({
    amount: {
      color: theme.colors.number,
    },
    category: {
      color: theme.colors.category,
    },
  })

const View: React.SFC<ViewProps> = ({ categories, classes }) => (
  <React.Fragment>
    {toPairs(categories).map(([name, balance]) => (
      <Typography className={classes.amount}>
        Spent {balance} USD on <span className={classes.category}>{name}</span>
      </Typography>
    ))}
  </React.Fragment>
)

export const StatusCategories = compose<ViewProps, OutterProps>(
  pure,
  withStyles(styles),
  withConnectedProps<ConnectedProps, OutterProps & InnerProps>((state, ownProps) => ({
    categories: categoriesSelector.expenses(0, ownProps.command.timestamp)(state),
  })),
  withHandlers<OutterProps & InnerProps, HandlerProps>({}),
  setDisplayName('StatusCategories')
)(View)
