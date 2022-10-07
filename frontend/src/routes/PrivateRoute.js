// Dependencies
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

export const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext)

  return user.logged ? children : <Navigate to="/admin/login" />
}
