import React, { useState } from "react"

import Modal from "../../components/Modal"
import { Button } from "../../components/Element"
import { useQuery, useMutation } from "@apollo/react-hooks"

import gql from "graphql-tag"

const GET_PING = gql`
  query {
    ping {
      text
    }
  }
`

const UPDATE_PING = gql`
  mutation updatePing($text: String) {
    updatePing(text: $text) {
      text
    }
  }
`

const HomeContainer = () => {
  const {loading, error, data } = useQuery(GET_PING)
  const [open, setOpen] = useState(false)
  const [updateNote, { }] = useMutation(UPDATE_PING, {
    update(cache, { data: { updateNote } }) {
      cache.writeQuery({
        query: GET_PING,
        data: { notes: updateNote },
      })
    }
  })


  if (loading) return <p>loading..</p>
  if (error) return <p>error..</p>

  const handleOpen = () => {
    updateNote({ variables : { text: "hihihi" }})
    //setOpen(true)
  }

  const handleClose = () => {
    //setOpen(false)
  }

  return (
    <div>
      Home!!! {data.ping.text}
      <button onClick={handleOpen}>click</button>
      <Modal.Container open={open}>
        <Modal.Header title={"Hello Header"} onClose={handleClose} />
        <Modal.Body>
          Hello Body
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-none btn-sm" onClick={handleClose}>닫기</Button>
          <Button className="btn-none btn-sm">저장</Button>
        </Modal.Footer>
      </Modal.Container>
    </div>
  )
}

export default HomeContainer