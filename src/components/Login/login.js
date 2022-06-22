import React, { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/UserAuthContext';
import { Alert } from "react-bootstrap";
function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("")
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
             await login(emailRef.current.value, passwordRef.current.value)
            navigate('/expense')
        } catch (e){
            setError('failed to create an account')
        }
        setLoading(false)

    }
    return (
        <form className='col-sm-4 offset-sm-4 login'>
            <h3>LOGIN</h3>
            {error && <Alert variant='danger'>{error}</Alert>}
            <div className="form-group ">
                <label>Email</label>
                <input className="form-control" type="email" ref={emailRef} required />
            </div>

            <div className="form-group my-7">
                <label>Password</label>
                <input className="form-control" type="password" ref={passwordRef} required />
            </div>


            <button disabled={loading} onClick={handleSubmit} type="submit" className='btn btn-primary button'>Login</button>
            <label className ="my-4 mx-5 ">Create an New account<Link className ="mx-3 " to="/sign-up">Sign Up</Link></label>

        </form>
    );
}
export default Login;    
