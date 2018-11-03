import { Grid } from '@material-ui/core'
import * as React from 'react'
import { ViewProps } from '.'
import { AccountsList } from '../../components/AccountsList'
import { CategoriesList } from '../../components/CategoriesList'
import { RecentTransactionList } from '../../components/RecentTransactionList'
import { SmartInput } from '../../components/SmartInput'
import './styles.css'

export const MainPageView: React.SFC<ViewProps> = ({
  handleInputChange,
  input,
  handleInputSubmit,
  transactions,
  accounts,
  categories,
}) => (
  <div id="root">
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <SmartInput
          handleInputChange={handleInputChange}
          handleInputSubmit={handleInputSubmit}
          input={input}
        />
      </Grid>
      <Grid item xs={4}>
        <RecentTransactionList transactions={transactions} />
      </Grid>
      <Grid item xs={4}>
        <AccountsList accounts={accounts} />
      </Grid>
      <Grid item xs={4}>
        <CategoriesList categories={categories} />
      </Grid>
    </Grid>
  </div>
)
