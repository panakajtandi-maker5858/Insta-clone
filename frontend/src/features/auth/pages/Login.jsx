import React , {useState }from 'react'
import { Link,  useNavigate} from 'react-router-dom'
import axios from 'axios'
import '../style/form.scss'
import { useAuth } from '../hooks/useAuth'





const Login = () => {

const [ username , setUsername] = useState('')
const [ password , setPassword] = useState('')
const { loading , handleLogin } = useAuth()
const navigate = useNavigate()



async function handleSubmit(e){
    e.preventDefault()

   await handleLogin(username , password)
   navigate('/login')

}
if(loading) return <main><h1>Loading.....</h1></main>


  return (
    <>
    <main>
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} >
                    <input
                        onInput={(e) => { setUsername(e.target.value) }}
                        type="text"
                        name='username'
                        placeholder='Enter your  username' />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name='password'
                        placeholder='Enter your  password' />
                    <button type='submit'>Login</button>
                </form>
                <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
        </div>
    </main>
    
    </>
  )
}

export default Login