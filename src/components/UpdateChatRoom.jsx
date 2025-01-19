import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import toast from 'react-hot-toast'
import { Pencil } from 'lucide-react'
import { updateRoomApi } from '../services/allApis'
import { updateChatRoomContext } from '../Context/ContextApi'

function UpdateChatRoom({ room }) {

    const [show, setShow] = useState(false);
    const [data, setData] = useState({ ...room })

    const { setUpdateResponse } = useContext(updateChatRoomContext)

    const handleUpdateRoom = async () => {
        const { name } = data
        if (!name) {
            toast.error("Invaid input!")
        } else {
            const header = {
                'Content-Type': 'application/json',
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }
            const res = await updateRoomApi(room._id, header, data)

            if (res.status == 200) {
                toast.success("Room updated!")
                setUpdateResponse(res)
                handleClose()
            } else {
                toast.error("Updation failed!")
            }
        }
    }

    const handleClose = (e) => {
        e?.stopPropagation()
        setShow(false)
    }

    const handleShow = (e) => {
        e.stopPropagation()
        setShow(true)
    }

    return (
        <>
            <button onClick={(e) => handleShow(e)} className='btn text-warning'>
                <Pencil />
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title className='fw-bold'>Update Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="floatingName" label="Name">
                        <Form.Control defaultValue={room?.name} onChange={e => setData({ ...data, name: e.target.value })} type="name" placeholder="Name" />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleUpdateRoom} variant="primary">Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpdateChatRoom