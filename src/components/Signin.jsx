import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'


const Signin = () => {

    const [email, setEmail] = useState("test@gmail.com")
    const [password, setPassword] = useState('password')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')

    
    const {session, signInUser} = UserAuth();
    const navigate = useNavigate();


    const handleSignIn = async (e) =>{
        e.preventDefault();
        setLoading(true);

        try{
            const result = await signInUser(email, password);

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
        console.log('Signed in sucessfully')
    }

  return (
    <div className="w-full h-screen pt-16 pl-6">
       <form onSubmit={handleSignIn} action="">
        <h2>Sign In!</h2>
        
        <div>
            <input onChange={(e) => setEmail(e.target.value)} placeholder='email' type="email"/>
            <input onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password"/>
            <button type='submit' disabled={loading}>Sign in</button>
            {error && <p>{error}</p>}
        </div>
       </form>

       <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
    </div>
  )
}

export default Signin
