import React from 'react'
import CreateChatRoom from './CreateChatRoom'
import ChatRoomList from './ChatRoomList'

function Sidebar() {
    return (
        <>
            <CreateChatRoom />
            <div style={{ overflow: 'auto', height: "68vh" }}>
                <ChatRoomList />
            </div>
        </>
    )
}

export default Sidebar