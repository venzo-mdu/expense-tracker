import { useState, useEffect } from 'react'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'
import './index.css'
import { getDoc, doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db, auth, storage } from '../../../firebase'
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'INCOME',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

export default function MoneyManager() {
  const [transactionsList, setTransactionsList] = useState([])
  const [imageUpload, setImageUpload] = useState(null);
  const [dateInput, setDateInput] = useState("")
  const [optionId, setOptionId] = useState(transactionTypeOptions[0].optionId)
  const [amountInput, setAmountInput] = useState("")
  const [titleInput, setTitleInput] = useState("")
  const email =auth.currentUser.email;
  const [search, setSearch ] =useState('')
  const [searchFromDate ,setSearchFromDate] =useState([]);
  const [searchToDate ,setSearchToDate] =useState([]);

  const onChangeOptionId = event => {
    setOptionId(event.target.value)
  }

  const onChangeAmountInput = event => {
    setAmountInput(event.target.value)
  }

  const onChangeTitleInput = event => {
    setTitleInput(event.target.value)
  }

  const onChangeDateInput = event => {
    setDateInput(event.target.value)
  }

  const getExpenses = () => {
    let expensesAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type.optionId === transactionTypeOptions[1].optionId) {
        expensesAmount += eachTransaction.amount
      }

    })
    return expensesAmount
  }

  const getIncome = () => {
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type.optionId === transactionTypeOptions[0].optionId) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  const getBalance = () => {
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type.optionId === transactionTypeOptions[0].optionId) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount

  }
  const typeOption = transactionTypeOptions.find(
    eachTransaction => eachTransaction.optionId === optionId,
  )

  
  const createData = async () => {
    const docref = doc(db, 'expenseTracker', email);    
    const imageRef = ref(storage, `images/${imageUpload.name + v4() }`)
    let snapshot = await uploadBytes(imageRef, imageUpload);
    let url = await getDownloadURL(snapshot.ref);
    const datalist = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      date: dateInput,
      type: typeOption,
      file: url
    }
    let details = await getDoc(docref)
        if(details.data() === undefined){
          await setDoc(docref, {
            trans: [datalist]
          })
        }else{
        await updateDoc(docref, {
          trans: arrayUnion(datalist)
        })}
     
      getTransactions()
      setTitleInput('')
      setAmountInput('')
      setOptionId(transactionTypeOptions[0].optionId)
      setDateInput('')
    }
    const getTransactions = async () => {
      const docref = doc(db, 'expenseTracker', email);
      const querySnapshot = await getDoc(docref);
      // setTransactionsList(querySnapshot.data().trans);
      const list =querySnapshot.data().trans
      setTransactionsList(list)
    };

    const getFilterData=()=>{
      if ((searchFromDate && searchToDate) !=0  && (search.length >0))
        {
            return transactionsList.filter (obj => 
                obj.date >= searchFromDate && obj.uploadedDate <= searchToDate && obj.fileName.toLowerCase().includes(search.toLowerCase()));
        }
        else if ((searchFromDate && searchToDate) !=0 ) {
             return transactionsList.filter (obj => 
                obj.date >= searchFromDate && obj.date <= searchToDate                         
            )
          }        else if (searchFromDate  !=0 ) {
            return transactionsList.filter (obj => 
               obj.date >= searchFromDate                          
           )
         }        else if ( searchToDate !=0 ) {
          return transactionsList.filter (obj => 
             obj.date <= searchToDate                         
         )
       }else if (search.length >0){
          return transactionsList.filter(
              obj => obj.type.optionId.toLowerCase().includes(search.toLowerCase())
            )
        }
    return transactionsList;
    }

    useEffect(() => {
      getTransactions();

    },); 

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="header-container">
            <h1 className="heading">Hi,</h1>
            <div className="searchLine">
              <input type='text' id="searchItem" placeholder='search' onChange={(e) => setSearch(e.target.value)} /> 
              <input type="date" dateFormat onChange={e=>setSearchFromDate(e.target.value)}  ></input>
              <input type="date" onChange={e=>setSearchToDate(e.target.value)}></input>
            </div>
            <p className="header-content">
              Welcome back to your
              <span className="money-manager-text"> Expense Tracker</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={getBalance()}
            incomeAmount={getIncome()}
            expensesAmount={getExpenses()}
          />
          <div className="transaction-details">
            <h1 className="transaction-header">Add Transaction</h1>     
            <label className="input-label" htmlFor="title">
              TITLE
            </label>
            <input
              type="text"
              id="title"
              value={titleInput}
              onChange={onChangeTitleInput}
              className="input"
              placeholder="TITLE"
            />
            <label className="input-label" htmlFor="amount">
              AMOUNT
            </label>
            <input
              type="number"
              id="amount"
              className="input"
              value={amountInput}
              onChange={onChangeAmountInput}
              placeholder="AMOUNT"
            />
            <label className="input-label" htmlFor="select">
              TYPE
            </label>
            <select
              id="select"
              className="input"
              onChange={onChangeOptionId}
              defaultValue={transactionTypeOptions[0].optionId}
              value={optionId}
            >
              {transactionTypeOptions.map(eachOption => (
                <option key={eachOption.optionId} value={eachOption.optionId}>
                  {eachOption.optionId}
                </option>
              ))}
            </select>
            <label className="input-label" htmlFor="select" >
              date
            </label>
            <input
              type="date"
              id="date"
              className="input"
              value={dateInput}
              onChange={onChangeDateInput}
              placeholder="date"
            />
            <label className="input-label" htmlFor="select">
              Bill
            </label>
            <input type="file" id="file" className="input py-2" onChange={(event) => { setImageUpload(event.target.files[0]) }}></input>

            <button className="btn btn-primary my-2" onClick={createData} >
              Add
            </button>
            <div className="history-transactions">
              <h1 className="transaction-header">History</h1>
              <div className="transactions-table-container">
                <ul className="transactions-table">
                  <li className="table-header">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
                    <p className='table-header-cell'>Date</p>
                    <p className='table-header-cell'>Bill</p>
                  </li>
                  {getFilterData().map(eachTransaction => (
                      <TransactionItem
                        key={eachTransaction.id}
                        transactionDetails={eachTransaction}
                      />
                  ))}


                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    )

  }

