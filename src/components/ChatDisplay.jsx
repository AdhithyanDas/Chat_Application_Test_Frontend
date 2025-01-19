import React, { useContext, useEffect, useRef, useState } from 'react'
import { fetchMessageApi } from '../services/allApis'
import { roomDivClickContext } from '../Context/ContextApi'
import { socketContext } from '../Context/SocketContext'

function ChatDisplay() {

    const [message, setMessage] = useState([])
    
    const { socket } = useContext(socketContext)
    const { divClickResponse } = useContext(roomDivClickContext)
    const { onlineUsers, lastSeen } = useContext(socketContext)
    const scrollRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }, [message])

    useEffect(() => {
        getData()
        socket.on('receiveMessage', (newMessage) => {
            newMessage.senderId = newMessage.senderId
            setMessage((prev) => [...prev, newMessage])
        })
        return () => {
            socket.off('receiveMessage')
        }
    }, [divClickResponse.roomId, socket])

    const getData = async () => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`,
        };
        const res = await fetchMessageApi(divClickResponse.roomId, header)
        console.log(res);
        if (res.status == 200) {
            setMessage(res.data.messages)
        }
    }

    const getUserStatus = (userId) => {
        return onlineUsers.includes(userId) ? 'online' : 'offline'
    }

    const getLastSeen = (userId) => {
        return lastSeen[userId] ? `Last seen: ${new Date(lastSeen[userId]).toLocaleString()}` : ""
    }

    return (
        <>
            {
                message.length > 0 ?
                    <>
                        {
                            message.map(item => (
                                <div ref={scrollRef} className={`chat ${item.senderId._id === sessionStorage.getItem('userId') ? 'chat-end' : 'chat-start'}`}>
                                    <div className="chat-header">
                                        <h6 className='fw-bold'>{item.senderId?.username}</h6>
                                        <span className="text-xs opacity-60">{getUserStatus(item.senderId._id)}</span>
                                    </div>

                                    <div className="chat-bubble">{item.content}</div>

                                    <div className="chat-footer opacity-50">
                                        {getUserStatus(item.senderId._id) === 'offline' && (
                                            <span className="text-xs">{getLastSeen(item.senderId._id)}</span>
                                        )} <br />
                                        {item.createdAt ? new Date(item.createdAt).toLocaleString() : 'Invalid Date'}
                                    </div>
                                </div>
                            ))
                        }
                    </>
                    :
                    <div className='d-flex justify-center'><h3 className='text-center'>There is no messages!</h3></div>
            }
        </>
    )
}

export default ChatDisplay