import React, { useContext, useEffect, useState } from 'react'
import { fetchMessageContext, roomDivClickContext } from '../Context/ContextApi'
import { sendMessageApi } from '../services/allApis'
import { socketContext } from '../Context/SocketContext'
import toast from 'react-hot-toast'

function ChatInputBox() {

    const { divClickResponse } = useContext(roomDivClickContext)

    const [message, setMessage] = useState({
        content: "", roomId: divClickResponse.roomId, senderId: sessionStorage.getItem('userId')
    })

    const { socket } = useContext(socketContext);
    const { setMessageResponse } = useContext(fetchMessageContext)

    useEffect(() => {
        setMessage((prev) => ({
            ...prev, roomId: divClickResponse.roomId
        }))
    }, [divClickResponse?.roomId])

    const handleSendMessage = async () => {
        const { content, roomId, senderId } = message
        if (!content || !roomId || !senderId) {
            toast.error("Type a message!")
        } else {
            socket.emit('sendMessage', { content, roomId, senderId, username: senderId.username })

            const header = {
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
            }
            const res = await sendMessageApi(roomId, header, message)

            if (res.status == 200) {
                setMessageResponse(res.data)
                setMessage((prev) => ({ ...prev, content: "" }))
            }
        }
    }

    return (
        <>
            <div style={{ background: 'lightgray', height: "8vh" }} className='d-flex align-items-center ps-2'>
                <input onChange={e => setMessage({ ...message, content: e.target.value })} value={message.content} type="text"
                    style={{ height: '7vh', width: '90%', background: 'white' }} />
                <button onClick={handleSendMessage} className='btn btn-primary ms-3'>Send</button>
            </div>
        </>
    )
}

export default ChatInputBox