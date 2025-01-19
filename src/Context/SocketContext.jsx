import React, { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export const socketContext = createContext()

function SocketContext({ children }) {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]) // onlineUsers
    const [userId, setUserId] = useState(sessionStorage.getItem('userId'))
    const [lastSeen, setLastSeen] = useState({})

    useEffect(() => {
        if (userId) {
            const newSocket = io('http://localhost:3000', {
                query: { userId },
            })
            setSocket(newSocket);
            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
            })
            newSocket.on("updateLastSeen", (data) => {
                setLastSeen(data)
            })
            return () => newSocket.disconnect()
        }
    }, [userId])

    // login
    const handleLoginSubmit = (newUserId) => {
        setUserId(newUserId)
    }

    // logout
    const handleLogout = () => {
        sessionStorage.clear()
        setUserId(null)
    }

    return (
        <socketContext.Provider value={{ socket, handleLoginSubmit, onlineUsers, handleLogout, lastSeen }}>
            {children}
        </socketContext.Provider>
    );
}

export default SocketContext
