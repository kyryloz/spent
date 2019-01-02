import { createStyles, Theme, Typography, withStyles } from '@material-ui/core'
import { flow, isEmpty, toPairs } from 'lodash'
import * as moment from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'
import { EvaluationActionCreator } from 'store/evaluation/actions'
import { App } from 'store/interface'
import { CategorySelector } from 'store/model/category/selectors'
import { Classes } from 'utils/styleUtils'

const styles = (theme: Theme) =>
  createStyles({
    body: {
      border: `1px solid ${theme.colors.info}`,
      borderRadius: 5,
      padding: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
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
  command: ReturnType<typeof EvaluationActionCreator.status>
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
  <div className={classes.body}>
    {toPairs(categories).map(([name, balance]) => (
      <Typography key={name} className={classes.amount}>
        Spent {balance} USD on <span className={classes.category}>{name}</span>
      </Typography>
    ))}
    {isEmpty(categories) && (
      <Typography className={classes.bodyTitle}>Don't have any categories</Typography>
    )}
  </div>
)

export const StatusCategories = flow(
  withStyles(styles),
  connect<StateProps, {}, OwnProps, App.State>((state, ownProps) => ({
    categories: CategorySelector.expenses(0, moment().unix())(state),
  }))
)(StatusCategoriesCmp)
