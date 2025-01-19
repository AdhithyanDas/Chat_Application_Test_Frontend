import React, { useContext, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import toast from 'react-hot-toast'
import { loginApi, registerApi } from '../services/allApis'
import { useNavigate } from 'react-router-dom'
import { authContext, roomDivClickContext } from '../Context/ContextApi'
import { socketContext } from '../Context/SocketContext'

function Auth() {

    const [authStatus, setAuthStatus] = useState(false)
    const [user, setUser] = useState({
        username: "", password: ""
    })

    const { setDivClickResponse } = useContext(roomDivClickContext)
    const { handleLoginSubmit } = useContext(socketContext)
    const { setAuthContextStatus } = useContext(authContext) // context-status

    const nav = useNavigate()

    const changeAuth = () => {
        setAuthStatus(!authStatus)
    }

    const handleRegister = async () => {
        const { username, password } = user
        if (!username || !password) {
            toast.error("All fields are required!")
        } else {
            if (password.length < 6) {
                toast.error("Password must be at least 6 characters!")
            }
        }
        const res = await registerApi(user)

        if (res.status == 200) {
            toast.success("Registration successful!")
            setUser({
                username: "", password: ""
            })
            changeAuth()
        } else if (res.status == 400) {
            if (res.response.data == 'User already exists!') {
                toast.error("Username already registered!")
            }
        }
    }

    const handleLogin = async () => {
        const { username, password } = user
        if (!username || !password) {
            toast.error("Enter both email and password!")
        } else {
            const res = await loginApi(user)
            if (res.status == 200) {
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('username', res.data.username)
                sessionStorage.setItem('userId', res.data.userId)
                handleLoginSubmit(res.data.userId)
                setDivClickResponse(false)
                setUser({
                    username: "", password: ""
                })
                toast.success('Login successful!')
                setAuthContextStatus(true)
                nav('./home')
            } else {
                toast.error("Incorrect email or password!")
            }
        }
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center' style={{ height: '90vh', background: "#F9F9F9" }}>
                <div className='py-4 px-5 border rounded shadow' style={{ width: '50vw', maxHeight: '55vh', background: '#FFFFFF' }}>
                    <h2 className='text-center fw-bold'>{authStatus ? 'Register' : 'Log In'}</h2>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Username"
                        className="mb-3 mt-4"
                    >
                        <Form.Control value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} type="text" placeholder="Username" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} type="password" placeholder="Password" />
                    </FloatingLabel>
                    <div className='d-grid mt-3'>
                        {
                            authStatus ?
                                <button onClick={handleRegister} className='btn btn-primary fw-bold py-2'>Sign Up</button>
                                :
                                <button onClick={handleLogin} className='btn btn-primary fw-bold py-2'>Sign In</button>
                        }
                    </div>
                    <div className='d-flex justify-content-center mt-1'>
                        <button onClick={changeAuth} className='btn btn-link' style={{ color: '#6B7280', textDecoration: 'none' }}>
                            {authStatus ? 'Have an account?' : "Dont have an account?"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth