import { createStyles, Theme, Typography, withStyles } from '@material-ui/core'
import { flow, isEmpty, toPairs } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { categoriesSelector } from 'store/categories/selectors'
import { Commands } from 'store/commands/interface'
import { App } from 'store/interface'
import { Classes } from 'utils/styleUtils'

const styles = (theme: Theme) =>
  createStyles({
    amount: {
      color: theme.colors.number,
    },
    category: {
      color: theme.colors.category,
    },
    bodyTitle: {
      color: theme.colors.info,
    },
  })

interface OwnProps {
  command: Commands.StatusData
}

interface StyleProps {
  classes: Classes<typeof styles>
}

interface StateProps {
  categories: {
    [name: string]: number
  }
}

const StatusCategoriesCmp: React.SFC<OwnProps & StyleProps & StateProps> = ({
  categories,
  classes,
}) => (
  <React.Fragment>
    {toPairs(categories).map(([name, balance]) => (
      <Typography key={name} className={classes.amount}>
        Spent {balance} USD on <span className={classes.category}>{name}</span>
      </Typography>
    ))}
    {isEmpty(categories) && (
      <Typography className={classes.bodyTitle}>Don't have any categories</Typography>
    )}
  </React.Fragment>
)

export const StatusCategories = flow(
  withStyles(styles),
  connect<StateProps, {}, OwnProps, App.State>((state, ownProps) => ({
    categories: categoriesSelector.expenses(0, ownProps.command.timestamp)(state),
  }))
)(StatusCategoriesCmp)
