import React, { createContext, useState } from 'react'

export const createChatRoomContext = createContext()
export const updateChatRoomContext = createContext()
export const roomDivClickContext = createContext()
export const fetchMessageContext = createContext()
export const authContext = createContext()

function ContextApi({ children }) {

    const [createResponse, setCreateResponse] = useState("")
    const [updateResponse, setUpdateResponse] = useState("")
    const [divClickResponse, setDivClickResponse] = useState({
        div: false, name: "", participants: "", roomId: ""
    })
    const [messageResponse, setMessageResponse] = useState([])
    const [authContextStatus, setAuthContextStatus] = useState(
        sessionStorage.getItem('token') ? true : false
    )

    return (
        <>
            <createChatRoomContext.Provider value={{ createResponse, setCreateResponse }}>
                <updateChatRoomContext.Provider value={{ updateResponse, setUpdateResponse }}>
                    <roomDivClickContext.Provider value={{ divClickResponse, setDivClickResponse }}>
                        <fetchMessageContext.Provider value={{ messageResponse, setMessageResponse }}>
                            <authContext.Provider value={{ authContextStatus, setAuthContextStatus }}>
                                {children}
                            </authContext.Provider>
                        </fetchMessageContext.Provider>
                    </roomDivClickContext.Provider>
                </updateChatRoomContext.Provider>
            </createChatRoomContext.Provider>
        </>
    )
}

export default ContextApi