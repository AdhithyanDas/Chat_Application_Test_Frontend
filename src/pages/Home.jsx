import React from 'react'
import Sidebar from '../components/Sidebar'
import MessageContainer from '../components/MessageContainer'

function Home() {
    return (
        <>
            <div className='d-flex justify-content-center align-items-center' style={{ height: '90vh', background: "#F9F9F9" }}>
                <div className='border rounded shadow d-flex' style={{ width: '80vw', height: '75vh', background: '#FFFFFF' }}>
                    <div style={{ width: "20vw", borderRight: '1px solid black' }}>
                        <Sidebar />
                    </div>
                    <div style={{ width: "60vw" }}>
                        <MessageContainer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home