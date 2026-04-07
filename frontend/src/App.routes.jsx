import React from 'react'
import { createBrowserRouter  } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'




export const router = createBrowserRouter([

{ path: "/login" , element: <Login/>} ,
{ path: '/register' , element: <Register/>} ,
{ path: '/', element: <div>
    <h1>Welcome to our Website .</h1> 
    <p>Site is under Progress.....</p>
</div>}

])