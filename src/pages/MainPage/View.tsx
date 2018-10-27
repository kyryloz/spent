import * as React from 'react'
import { SmartInput } from '../../components/SmartInput'
import { TransactionList } from '../../components/TransactionList'
import { Transaction } from '../../store/transactionList/interface'
import './styles.css'

interface Props {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  input: string
  handleInputSubmit: () => void
  transactions: Array<Transaction>
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
      <TransactionList transactions={transactions} />
    </div>
  </div>
)
