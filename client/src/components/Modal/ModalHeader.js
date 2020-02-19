import React from "react"

const ModalHeader = ({ title, onClose }) => {
  return (
    <header className="modal-header">
      <span>{title}</span>
      <span className="modal-close" onClick={onClose}>×</span>
    </header>
  )
}

export default ModalHeader