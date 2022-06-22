import React, {useRef,useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { useAuth } from '../../context/UserAuthContext';
import {Alert} from "react-bootstrap";
function Signup(){
    const emailRef =useRef();
    const passwordRef =useRef();
    const passwordConfirmRef =useRef();
    const nameRef =useRef();
    const [error,setError] =useState("");
    const [loading,setLoading] =useState("")
    const { signup } =useAuth();
    const navigate = useNavigate();


    async function handleSubmit (e) {
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("password don't match")
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value,passwordRef.current.value,passwordConfirmRef.current.value,nameRef.current.value,)
            navigate('/')
        }catch{
            setError('failed to create an account')
        }
        setLoading(false)

    }
        return (
            <form className='col-sm-4 offset-sm-4 login'>
                <h3>Register</h3>
                {error && <Alert variant='danger'>{error}</Alert>}
                <div className="form-group ">
                        <label>User</label>
                        <input className="form-control" type="text" ref={nameRef} required/>

                    </div>

                <div className="form-group ">
                        <label>Email</label>
                        <input className="form-control" type="email" ref={emailRef} required/>
                    </div>

                    <div className="form-group my-7">
                        <label>Password</label>
                        <input className="form-control" type="password" ref={passwordRef} required/>

                    </div>
                    
                    <div className="form-group my-7">
                        <label>confirm Password</label>
                        <input className="form-control" type="password" ref={passwordConfirmRef} required/>

                    </div>

                    <button disabled={loading} onClick={handleSubmit} type="submit" className='btn btn-primary button'>SignUp</button>
                    <label  className ="my-4 mx-5 ">Already have an account<Link  className ="my-4 mx-5 " to="/">Login</Link></label>

            </form>
        );
    }
export default Signup;    
