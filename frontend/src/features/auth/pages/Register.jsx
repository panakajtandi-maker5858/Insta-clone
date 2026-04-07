import React from 'react'
import { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import asios from "axios"
import { useAuth } from '../hooks/useAuth'







const Register = () => {

const [ username , setUsername ] = useState('')
const [ email , setEmail ] = useState('')
const [ password , setPassword ] = useState('')
const navigate = useNavigate()
const { loading , handleRegister} = useAuth()



async function handleSubmit(e){
    e.preventDefault()

   await handleRegister(username , email , password)
   navigate('/login')



}

if (loading) return <main><h1>Loading....</h1></main>

  return (
    <>
    <main>
        <div className='form-container'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} >
                <input 
                onInput={(e)=> {setUsername(e.target.value)}}
                type="text"
                name='username' 
                placeholder='Enter your username'/>

                <input 
                onInput={(e)=>{setEmail(e.target.value)}}
                type="text"
                name='email'
            placeholder='Enter your email' />

            <input
            onInput={(e)=> { setPassword(e.target.value)}}
            type="password"
            name='password'
            placeholder='Enter your password'
            />

        <button className='button primary-button' >Register</button>

            </form>

<p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>

        </div>
    </main>
    </>
  )
}

export default Register