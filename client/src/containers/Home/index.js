import React, { useState } from "react"

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
  const [text, setText] = useState("")
  const [updatePing] = useMutation(UPDATE_PING, {
    update(cache, { data: { updatePing } }) {
      cache.writeQuery({
        query: GET_PING,
        data: { ping: updatePing },
      })
    }
  })

  if (loading) return <p>loading..</p>
  if (error) return <p>error..</p>

  const handleClick = () => {
    updatePing({ variables: { text } })
    setText("")
  }

  const handleInput = (e) => {
    setText(e.target.value)
  }

  return (
    <div>
      Home!!! {data.ping.text}<br/>
      <input type="text" value={text} onChange={handleInput}/>
      <button onClick={handleClick}>click</button>
    </div>
  )
}

export default HomeContainer