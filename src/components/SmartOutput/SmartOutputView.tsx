import * as React from 'react'
import { ViewProps } from '.'
import { RecentTransactionList } from '../RecentTransactionList'

export const SmartOutputView: React.SFC<ViewProps> = ({ transactions, classes }) => (
  <div className={classes.root}>
    <RecentTransactionList transactions={transactions} />
  </div>
)
