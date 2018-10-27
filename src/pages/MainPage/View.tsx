import * as React from 'react'
import { RecentTransactionList } from '../../components/RecentTransactionList'
import { SmartInput } from '../../components/SmartInput'
import { Transactions } from '../../store/transactions/interface'
import './styles.css'

interface Props {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  input: string
  handleInputSubmit: () => void
  transactions: Array<Transactions.Transaction>
}

export const View: React.SFC<Props> = ({
  handleInputChange,
  input,
  handleInputSubmit,
  transactions,
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
      <RecentTransactionList transactions={transactions} />
    </div>
  </div>
)
