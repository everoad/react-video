import React, { memo, useRef, forwardRef, useImperativeHandle } from "react"

import styled from "styled-components"

import baseStyle from "../../../lib/style/base"


const Input = (props, ref) => {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    }
  }))
  return <CustomInput {...props} ref={inputRef} />
}


const CustomInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 2px;
  border: 0.5px solid #d2d6de;
  outline: none;
  outline-style: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-sizing: border-box;
  &:focus {
    border: 0.5px solid ${baseStyle.color.primary.active};
  }
  &.input-sm {
    padding: 0.5rem;
  }
`

export default memo(forwardRef(Input))