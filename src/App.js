import React from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login/login'
import SignUp from './components/Signup/signup'
import Navbar from './components/Navbar/nav'
import Expense from './components/expense/MoneyManager/index'
import { AuthProvider } from './context/UserAuthContext';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="outer">
          <div className="inner">
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/sign-up" element={<SignUp />} /> 
              <Route exact path="/expense" element= {<Expense/>} />
            </Routes>
            </AuthProvider>
          </div>
          
        </div>

      </div>
    </Router>
  )
}

export default App;