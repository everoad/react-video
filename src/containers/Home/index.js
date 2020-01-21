import React, { useState } from "react"

import Modal from "../../components/Modal"
import { Button } from "../../components/Element"

const HomeContainer = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      Home!!!
      <button onClick={handleOpen}>click</button>
      <Modal.Container open={open}>
        <Modal.Header title={"Hello Header"} onClose={handleClose} />
        <Modal.Body>
          Hello Body
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-default" onClick={handleClose}>닫기</Button>
          <Button className="btn-primary">저장</Button>
        </Modal.Footer>
      </Modal.Container>
    </div>
  )
}

export default HomeContainer