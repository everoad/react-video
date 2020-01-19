import React from "react"

import styled from "styled-components"


const Modal = (props) => {
    return (
        <ModalContent>
          <section>

          </section>
        </ModalContent>
    )
}

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 9999;
  section {
    width: 500px;
    height: 500px;
    background-color: #fff;
  }
`

export default Modal