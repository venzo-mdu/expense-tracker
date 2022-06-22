import './index.css'
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';



const TransactionItem = props => {
  const {transactionDetails} = props
  const { title, amount, type, date, file} = transactionDetails

  return (
    <li className="table-row">
      <p className="transaction-text">{title}</p>
      <p className="transaction-text">Rs {amount}</p>
      <p className="transaction-text">{type.displayText}</p>
      <p className='transaction-text'>{date}</p>
      <a className='transaction-text' src={file}>{file}</a>
      {/* <Popup trigger={<button>{file}</button>} 
     position="right center">
      <img src={file} />
    </Popup> */}
    </li>
  )
}

export default TransactionItem
