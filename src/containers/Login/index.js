import React, { useState, useRef, useEffect } from "react"

import { Redirect, useHistory } from "react-router-dom"

import useInputs from "../../hooks/useInputs"


import { Button, Input } from "../../components/Element"

import styled from "styled-components"


const userState = { 
  userId: '', 
  password: '' 
}

const LoginContainer = () => {
  const [user, onChange] = useInputs(userState)
  const history = useHistory()
  const userIdRef = useRef()
  const passwdRef = useRef()

  useEffect(() => {
    userIdRef.current.focus()
  }, [])

  const handleClick = () => {
    sessionStorage.setItem("token", "hihi")
    history.push("/")
  }

  if (sessionStorage.getItem('token')) {
    return <Redirect to="/" />
  }

  return (
    <Content>
      <section>
        <header>
          <h2>LOGIN</h2>
        </header>
        <div>
          <Input
            type="text" autoComplete="username" placeholder="ID.." name="userId" 
            value={user.userId} onChange={onChange} ref={userIdRef} maxLength={15}
          />
          <Input
            type="password" autoComplete="current-password" placeholder="Password.." name="password" 
            value={user.password} onChange={onChange} ref={passwdRef} maxLength={30}
          />
          <Button 
            className="btn-primary btn-block btn-lg" 
            onClick={handleClick}
          >LOGIN</Button>
        </div>
      </section>
    </Content>
  )
}


const Content = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  section {
    padding: 1rem;
    margin-bottom: 10rem;
    width: 350px;
    box-shadow: 0px 0px 2px #333;
    border-radius: 3px;
    >header {
      text-align: center;
    }
    >div>input {
      margin-bottom: 0.5rem;
    }
    >div>button {
      margin-top: 0.5rem;
    }
  }
`

export default LoginContainer