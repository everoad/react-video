import React, { useRef, useEffect, useState } from "react"

import useInputs from "../../hooks/useInputs"

import { Button, Input } from "../../components/Element"

import styled from "styled-components"
import baseStyles from "../../lib/style/base"


const userState = { 
  userId: '', 
  password: '' 
}

const LoginContainer = ({ handleClose }) => {
  const [user, onChange] = useInputs(userState)
  const [fade, setFade] = useState(false)
  const userIdRef = useRef()
  const passwdRef = useRef()


  useEffect(() => {
    setFade(true)
    userIdRef.current.focus()
  }, [])


  const login = () => {
    handleClose()
  }

  
  return (
    <LoginContent className={fade ? "in" : ""}>
      <section>
        <header>
          <span>LOGIN</span>
          <span className="modal-close" onClick={handleClose}>×</span>
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
          <Button className="btn-primary btn-block btn-lg" onClick={login}>LOGIN</Button>
        </div>
      </section>
    </LoginContent>
  )
}


const LoginContent = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.5);
  z-index: 9999;
  opacity: 0;
  &.in {
    transition: opacity 0.3s;
    opacity: 1;
  }
  >section {
    background-color: #fff;
    padding: 1rem;
    margin-bottom: 10rem;
    width: 350px;
    box-shadow: 0px 0px 2px #333;
    border-radius: 3px;
    >header {
      text-align:center;
      padding-bottom: 1rem;
      font-size: 1.5rem;
      font-weight: 550;
      >span:last-child {
        float: right;
        cursor: pointer;
        margin-top: -0.5rem;
        &:hover {
          color: ${baseStyles.color.primary.active};
        }
      }
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