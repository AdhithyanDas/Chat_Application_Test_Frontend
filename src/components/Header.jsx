import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import toast from 'react-hot-toast'
import { MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { socketContext } from '../Context/SocketContext'
import { authContext } from '../Context/ContextApi'

function Header() {

    const { handleLogout } = useContext(socketContext)
    const isLoggedIn = sessionStorage.getItem('username')
    const { setAuthContextStatus } = useContext(authContext) // context-status
    const nav = useNavigate()

    const handleLogoutt = () => {
        handleLogout()
        toast.success("Logout successful!")
        setAuthContextStatus(false)
        nav('/')
    }

    return (
        <>
            <Navbar className="bg-primary border-0">
                <Container>
                    <Navbar.Brand className='text-white fw-bold d-flex align-items-center'>
                        <MessageCircle />
                        {' '}
                        <span className='ms-1'>TalkHub</span>
                    </Navbar.Brand>

                    <div className='ms-auto'>
                        {
                            isLoggedIn &&
                            <>
                                <button onClick={handleLogoutt} className='btn btn-dark'>
                                    Logout
                                </button>
                            </>
                        }
                    </div>
                </Container>
            </Navbar>
        </>
    )
}

export default Header