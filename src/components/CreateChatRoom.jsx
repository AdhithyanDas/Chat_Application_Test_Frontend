import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import toast from 'react-hot-toast'
import { createRoomApi } from '../services/allApis'
import { createChatRoomContext } from '../Context/ContextApi'

function CreateChatRoom() {

  const [show, setShow] = useState(false)
  const [room, setRoom] = useState({ name: "" })

  const { setCreateResponse } = useContext(createChatRoomContext)

  const handleCreateRoom = async () => {
    const { name } = room
    if (!name) {
      toast.error("Failed to create room!")
    } else {
      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      }
      const res = await createRoomApi(header, room)

      if (res.status == 200) {
        setCreateResponse(res)
        toast.success("Room created successful!")
        setRoom({ name: "" })
        handleClose()
      } else {
        toast.error("Room creation failed!")
      }
    }
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <div className='d-grid'>
        <button onClick={handleShow} className='btn btn-primary fw-bold py-2'
          style={{ borderRadius: '5px 0 0 0' }}>Create Room +</button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className='fw-bold'>Create Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingName" label="Name">
            <Form.Control onChange={e => setRoom({ ...room, name: e.target.value })} type="name" placeholder="Name" />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateRoom}>Create</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateChatRoom