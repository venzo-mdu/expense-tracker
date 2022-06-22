import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expensesAmount} = props

  return (
    <div className="money-details-container ">
      <div className="balance-container mx-2">
        <img
          src="http://cdn.onlinewebfonts.com/svg/img_359199.png"
          alt="balance"
          className="details-img"
        />
        <div>
          <p className="details-text">Your Balance</p>
          <p className="details-money" testid="balanceAmount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>
      <div className="income-container mx-2">
        <img
          src="https://library.kissclipart.com/20180829/jew/kissclipart-profit-blue-png-icon-clipart-computer-icons-profit-c7fc86719f7fa005.png"
          alt="income"
          className="details-img"
        />
        <div>
          <p className="details-text">Your Income</p>
          <p className="details-money" testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>
      <div className="expenses-container mx-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5501/5501384.png"
          alt="expenses"
          className="details-img"
        />
        <div>
          <p className="details-text">Your Expenses</p>
          <p className="details-money" testid="expensesAmount">
            Rs {expensesAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
