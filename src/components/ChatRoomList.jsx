import React, { useContext, useEffect, useState } from 'react'
import { deleteRoomApi, fetchRoomsApi } from '../services/allApis'
import { createChatRoomContext, roomDivClickContext, updateChatRoomContext } from '../Context/ContextApi'
import { Trash } from 'lucide-react'
import UpdateChatRoom from './UpdateChatRoom'
import toast from 'react-hot-toast'

function ChatRoomList() {

    const [data, setData] = useState([])

    const { createResponse } = useContext(createChatRoomContext)
    const { updateResponse } = useContext(updateChatRoomContext)
    const { setDivClickResponse } = useContext(roomDivClickContext)

    useEffect(() => {
        getData()
    }, [createResponse, updateResponse])

    const getData = async () => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await fetchRoomsApi(header)

        if (res.status == 200) {
            setData(res.data.rooms)
        } else {
            console.log(res)
        }
    }

    const handleDeleteRoom = async (id, e) => {
        e.stopPropagation()
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await deleteRoomApi(id, header)

        if (res.status == 200) {
            toast.success("Room deleted!")
            getData()
        } else {
            toast.error("Deletion failed!")
        }
    }

    const handleDivClick = (name, participants, roomId) => {
        setDivClickResponse({
            div: true, name, participants, roomId
        })
    }

    return (
        <>
            {
                data.length > 0 ?
                    <>
                        {
                            data?.map(item => (
                                <div onClick={() => handleDivClick(item.name, item.participants, item._id)} className='d-flex align-items-center ps-3'
                                    style={{ borderBottom: "1px solid black", height: "8vh", cursor: 'pointer' }}>
                                    <div className='d-flex  flex-column'>
                                        <h4 className='fw-bold mb-0'>{item.name}</h4>
                                        <span className='text-gray-500'>{new Date(item.createdAt).toLocaleString()}</span>
                                    </div>

                                    <div className='ms-auto'>
                                        <UpdateChatRoom room={item} />
                                        <button onClick={(e) => handleDeleteRoom(item._id, e)} className='btn text-primary'><Trash /></button>
                                    </div>
                                </div>
                            ))
                        }
                    </>
                    :
                    <h2 className='text-center'>No rooms available!</h2>
            }
        </>
    )
}

export default ChatRoomList