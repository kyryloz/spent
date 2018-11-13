import { Typography } from '@material-ui/core'
import { toPairs } from 'lodash'
import * as React from 'react'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({ categories, classes }) => (
  <React.Fragment>
    {toPairs(categories).map(([name, balance]) => (
      <Typography className={classes.amount}>
        Spent {balance} USD on <span className={classes.category}>{name}</span>
      </Typography>
    ))}
  </React.Fragment>
)
