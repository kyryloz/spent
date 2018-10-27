import * as React from 'react'
import { ViewProps } from '.'
import { RecentTransactionList } from '../../components/RecentTransactionList'
import { SmartInput } from '../../components/SmartInput'
import './styles.css'

export const View: React.SFC<ViewProps> = ({
  handleInputChange,
  input,
  handleInputSubmit,
  recentTransactions,
}) => (
  <div className="mainPage">
    <div className="smartInput">
      <SmartInput
        handleInputChange={handleInputChange}
        input={input}
        handleInputSubmit={handleInputSubmit}
      />
    </div>
    <div className="transactionList">
      <RecentTransactionList transactions={recentTransactions} />
    </div>
  </div>
)
