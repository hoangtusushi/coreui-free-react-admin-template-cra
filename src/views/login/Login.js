import React, { useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CButton,
  CAlert,
  CSpinner
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(
        'https://fridggie-backend-render-express.onrender.com/auth/login',
        {
          email,
          password,
        }
      )
      
      // Log response for debugging
      console.log('Response Data:', response.data)

      const { token } = response.data

      if (!token) {
        throw new Error('Token not found')
      }

      // Save token to localStorage
      localStorage.setItem('authToken', token)

      // Redirect to dashboard after successful login
      navigate('/dashboard')

    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // Server responded with a status code that falls out of the range of 2xx
        setError('Invalid email or password')
      } else if (error.request) {
        // Request was made but no response was received
        setError('Network error, please try again')
      } else {
        // Other errors
        setError('An error occurred. Please try again')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <CCard style={{ width: '400px' }}>
        <CCardBody>
          <h2 className="text-center mb-4">Login</h2>

          {error && <CAlert color="danger">{error}</CAlert>}

          <CForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <CFormInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CFormInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid">
              <CButton type="submit" color="primary" disabled={loading}>
                {loading ? <CSpinner size="sm" /> : 'Login'}
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Login