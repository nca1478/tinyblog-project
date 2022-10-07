// Dependencies
import React, { useEffect, useReducer } from 'react'
import { AppRoutes } from './routes/AppRoutes'
import { AuthContext } from './context/authContext'
import { authReducer } from './reducers/authReducer'

// Styles
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css/animate.min.css'
import './App.css'

const init = () => {
  return JSON.parse(sessionStorage.getItem('user')) || { logged: false }
}

export const App = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init)

  useEffect(() => {
    if (!user) return

    sessionStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRoutes />
    </AuthContext.Provider>
  )
}
