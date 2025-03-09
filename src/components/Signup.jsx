import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'


const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')

    const {session, signUpNewUser} = UserAuth();
    const navigate = useNavigate();

    const handleSignUp = async (e) =>{
        e.preventDefault();
        setLoading(true);

        try{
            const result = await signUpNewUser(email, password);

            if(result.success){
                navigate('/dashboard');
            }
        }
        catch(error){
            setError(error.message)
        }
        finally{
            setLoading(false);
        }
        console.log('Signed up sucessfully')
    }

  return (
    <div>
       <form onSubmit={handleSignUp} action="">
        <h2>Sign Up!</h2>
       
        <div>
            <input onChange={(e) => setEmail(e.target.value)} placeholder='email' type="email"/>
            <input onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password"/>
            <button type='submit' disabled={loading}>Sign up</button>
            {error && <p>{error}</p>}
        </div>
       </form>

       <p>
            Already have an account? <Link to="/signin">Sign in</Link>
        </p>
    </div>
  )
}

export default Signup
