import React from 'react'
import { Link } from 'react-router-dom'

const handleLogout = () => {
    localStorage.clear();
  };

function Nav() {
    return (
        <div className='nav'>
            <nav className="navbar fixed-top ">
            <img className='logo' src='https://i.pinimg.com/736x/de/a0/f3/dea0f3b7f480b1151c08db4a402a43b9.jpg' ></img>

                <div className="navbar-brand title">
                    Expense Tracker
                </div>
                <div className=' nav-right'>
                    <Link className="nav-link" to={'/'}>
                        Sign in
                    </Link>
                    <Link className="nav-link" to={'/sign-up'}>
                        Sign up
                    </Link>
                    <Link className="nav-link" to={'/'} onClick={handleLogout}>
                        Logout
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Nav;
