import React from "react"


import styled from "styled-components"


const Popup = ({ open, children }) => {
  return (
    <>
      {open && 
        <PopupContent>
          <header>

          </header>
          <article>
            {children}
          </article>
        </PopupContent>
      }
    </>
  )
}


const PopupContent = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  width: 280px;
  height: 150px;
  z-index: 20;
  background-color: red;
`

export default Popup