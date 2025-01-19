import React, { useContext, useEffect, useState } from 'react'
import { roomDivClickContext, updateChatRoomContext } from '../Context/ContextApi'
import { fetchJoinedRoomApi, joinRoomApi } from '../services/allApis'
import { socketContext } from '../Context/SocketContext'
import toast from 'react-hot-toast'
import ChatContainer from './ChatContainer'

function MessageContainer() {

  const [JoinRoom, setJoinRoom] = useState({})
  const { divClickResponse, setDivClickResponse } = useContext(roomDivClickContext)
  const { onlineUsers, lastSeen, socket } = useContext(socketContext)
  const { updateResponse } = useContext(updateChatRoomContext)


  useEffect(() => {
    getData();
  }, [onlineUsers, lastSeen])

  useEffect(() => {
    if (updateResponse?.status === 200 && divClickResponse.roomId === updateResponse.data._id) {
      setDivClickResponse((prev) => ({
        ...prev,
        name: updateResponse.data.name,
      }))
    }
  }, [updateResponse, divClickResponse.roomId, setDivClickResponse])

  const getData = async () => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`,
    };
    const res = await fetchJoinedRoomApi(header)

    if (res.status === 200) {
      const rooms = {}
      res.data.rooms.forEach((room) => {
        rooms[room._id] = true
      })
      setJoinRoom(rooms)
    } else {
      console.log(res)
    }
  }

  const handleJoinRoom = async () => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`,
    };
    const id = divClickResponse.roomId
    const res = await joinRoomApi(id, header)

    if (res.status === 200) {
      toast.success('Successfully joined the room!');
      setJoinRoom((prev) => ({
        ...prev,
        [divClickResponse.roomId]: true,
      }));
    } else {
      toast.error('Failed to join the room!')
    }
  }

  const getUserStatus = (userId) => {
    return onlineUsers.includes(userId) ? 'online' : 'offline'
  }

  const getLastSeen = (userId) => {
    return lastSeen[userId]
      ? `Last seen: ${new Date(lastSeen[userId]).toLocaleString()}`
      : 'No data'
  }

  return (
    <>
      {
        divClickResponse.div ?
          JoinRoom[divClickResponse.roomId] ?
            <div>
              <div style={{ height: '7vh', background: 'lightgray' }} className="d-flex align-items-center ps-2">
                <h2>Welcome to the Room: <span className='fw-bold'>{divClickResponse.name}</span></h2>
              </div>
              <ChatContainer />
            </div>
            :
            <div>
              <h1 className='text-center fw-bold'>{divClickResponse.name}</h1>
              {
                Array.isArray(divClickResponse.participants) && divClickResponse.participants.length > 0 ?
                  divClickResponse.participants.map((item) =>
                    <div key={item._id}>
                      <div className='d-flex justify-center'>
                        <h2>{item.username}</h2>
                        <div className='flex justify-center ms-3 mt-2'>
                          <p className='me-2'>{getUserStatus(item.userId)}</p>
                          {
                            getUserStatus(item.userId) == 'offline' &&
                            <p>{getLastSeen(item.userId)}</p>
                          }
                        </div>
                      </div>
                    </div>
                  )
                  :
                  <h2 className='text-center'>No participants</h2>
              }
              <div className='d-flex justify-center'>
                <button className="btn btn-primary" onClick={handleJoinRoom}>
                  Join Room
                </button>
              </div>
            </div>
          :
          <div className="d-flex justify-content-center align-items-center" style={{ height: '75vh' }}>
            <h2 className="fw-bold">Create a Room or Join</h2>
          </div>
      }
    </>
  )
}

export default MessageContainer