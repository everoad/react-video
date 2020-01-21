import React from "react"

import styled from "styled-components"


const ModalContainer = ({ children, open = false }) => {
    return (
      <>
        {open && (
          <ModalContent>
            <section className="modal-container">
              {children}
            </section>
          </ModalContent>
        )}
      </>
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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  .modal-container {
    width: 500px;
    background-color: #fff;
    margin-bottom: 100px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px #555;
  }
  .modal-header {
    display: flex;
    padding: 0.8rem;
    font-size: 1.2rem;
    font-weight: 550;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    .modal-close {
      font-size: 1.5rem;
      cursor: pointer;
      line-height: 1;
      opacity: 0.5;
      &:hover {
        opacity: 1;
      }
    }
  }
  .modal-body {
    padding: 0.8rem;
  }
  .modal-footer {
    padding: 0.8rem;
    text-align: right;
    border-top: 1px solid rgba(0,0,0,0.1);
  }
`

export default ModalContainer