import React, { useState } from "react"

import styled from "styled-components"

import useInputs from "../../hooks/useInputs"

import Modal from "../../components/Modal"

import PostCategoryWrapper from "./PostCategoryWrapper"
import { Button, Input, Select } from "../../components/Element"

const initCategory = {
  type: '',
  keyword: ''
}

const mock = [
  { type: 'keyword', keyword: '장삐쭈' },
  { type: 'keyword', keyword: '노래모음'}
]

const PostContainer = () => {
  const [categoryList, setCategoryList] = useState(mock)
  const [category, onChangeCategory] = useInputs(initCategory)
  const [open, setOpen] = useState(false)


  const handleAddCategory = () => {
    setCategoryList(categoryList.concat([ category ]))
    handleCloseModal()
  }

  const handleCloseModal = () => setOpen(false)

  const handleOpenModal = () => setOpen(true)

  return (
    <PostContent>
      <Button className="btn-none" onClick={handleOpenModal}>설정</Button>
      {categoryList.map((one, i) => (
        <PostCategoryWrapper key={i} {...one} />
      ))}
      <Modal.Container open={open}>
        <Modal.Header title={"카테고리 추가"} onClose={handleCloseModal}  />
        <Modal.Body>
          <div className="modal-input-wrapper">
            <Select 
              name="type" 
              value={category.type} onChange={onChangeCategory}>
              <option value="keyword">검색어</option>
              <option value="channel">채널</option>
            </Select>
            <Input 
              type="text" name="keyword" 
              value={category.keyword} onChange={onChangeCategory} 
            />
            <Button className="btn-default btn-sm" onClick={handleAddCategory}>추가</Button>
          </div>
          <ul>
            {categoryList.map((one, i) => (
              <li key={i}>{one.keyword}</li>
            ))}
          </ul>
        </Modal.Body>
      </Modal.Container>
    </PostContent>
  )
}

const PostContent = styled.div`
  .modal-input-wrapper {
    display: flex;
    input, select {
      width: 30%;
    }
  }
`

export default PostContainer