import React from "react"

import styled from "styled-components"

import baseStyles from "../../lib/style/base"

const Loading = ({ screen = false }) => {
  return (
    <LoadingContent className={screen ? 'full' : ''}>
      <div className="spinner-border text-danger">
        <span className="sr-only"></span>
      </div>
    </LoadingContent>
  )
}


const LoadingContent = styled.div`
  &.full {
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0);
    justify-content: center;
    align-items: center;
  }
  @-webkit-keyframes spinner-border {
    to {
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg); 
    } 
  }

  @keyframes spinner-border {
    to {
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg); 
    } 
  }

  .spinner-border {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    color: ${baseStyles.color.default.active};
    vertical-align: text-bottom;
    border: 0.25em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    -webkit-animation: spinner-border .75s linear infinite;
            animation: spinner-border .75s linear infinite; 
  }
`

export default Loading