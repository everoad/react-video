import React from "react"

import styled from "styled-components"

import baseStyle from "../../../lib/style/base"


const Button = (props) => {
  return (
    <CustomButton {...props}>{props.children}</CustomButton>
  )
}

const CustomButton = styled.button`
  outline: none;
  padding: 0.6rem 0.8rem;
  font-size: 0.9rem;
  font-weight: 550;
  border: none;
  border-radius: 3px;
  text-align: center;
  &+button {
    margin-left: 0.2rem;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 0px 1px #555 inset;
  }
  &.btn-primary {
    background-color: ${baseStyle.color.primary.normal};
    color: ${baseStyle.color.primary.font.normal};
    &:hover {
      background-color: ${baseStyle.color.primary.active};
      color: ${baseStyle.color.primary.font.normal};
    }
  }
  &.btn-danger {
    background-color: ${baseStyle.color.danger.normal};
    color: ${baseStyle.color.primary.font.normal};
    &:hover {
      background-color: ${baseStyle.color.danger.active};
      color: ${baseStyle.color.primary.font.normal};
    }
  }
  &.btn-success {
    background-color: ${baseStyle.color.danger.normal};
    color: ${baseStyle.color.primary.font.normal};
    &:hover {
      background-color: ${baseStyle.color.danger.active};
      color: ${baseStyle.color.primary.font.normal};
    }
  }
  &.btn-default {
    background-color: ${baseStyle.color.default.normal};
    color: ${baseStyle.color.default.font.normal};
    box-shadow: 0px 0px 0px 1px ${baseStyle.color.default.font.normal} inset;
    &:hover {
      background-color: ${baseStyle.color.default.active};
      color: ${baseStyle.color.default.font.active};
    }
  }
  &.btn-none {
    background-color: #fff;
    color: ${baseStyle.color.default.font.normal};
    opacity: 0.7;
    &:hover {
      opacity: 1;
      box-shadow: none;
    }
  }
  &.btn-block {
    width: 100%;
  }
  &.btn-lg {
    padding: 1rem;
  }
  &.btn-sm {
    padding: 0.4rem;
  }
`

export default Button