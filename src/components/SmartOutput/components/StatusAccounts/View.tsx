import { Typography } from '@material-ui/core'
import { toPairs } from 'lodash'
import * as React from 'react'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({ accounts, classes }) => (
  <React.Fragment>
    {toPairs(accounts).map(([name, balance]) => (
      <Typography className={classes.amount}>
        <span className={classes.account}>{name}</span> = {balance} USD
      </Typography>
    ))}
  </React.Fragment>
)
