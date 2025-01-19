import React from 'react'
import ChatDisplay from './ChatDisplay'
import ChatInputBox from './ChatInputBox'

function ChatContainer() {
    return (
        <>
            <div style={{ height: '60vh', overflow: 'auto' }}>
                <ChatDisplay />
            </div>

            <ChatInputBox />
        </>
    )
}

export default ChatContainer