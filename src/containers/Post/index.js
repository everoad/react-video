import React, { useEffect, useState, useRef } from "react"

import styled from "styled-components"

import useInputs from "../../hooks/useInputs"

import PostCategoryWrapper from "./PostCategoryWrapper"
import { Button, Input, Select } from "../../components/Element"

const initCategory = {
  keyword: ''
}

const mock = [
  { keyword: '장삐쭈' },
  { keyword: '노래모음' }
]

const PostContainer = () => {
  const [categoryList, setCategoryList] = useState(mock)
  //const [category, onChangeCategory] = useInputs(initCategory)
  const [editCategory, setEditCategory] = useState(initCategory)
  const [selectedCategory, setSelectedCategory] = useState(-1)
  const searchInputRef = useRef()

  useEffect(() => {
    searchInputRef.current.focus()
  }, [])


  const handleAddCategory = () => {
    setCategoryList(categoryList.concat([ editCategory ]))
    setEditCategory({
      ...editCategory,
      keyword: ''
    })
  }

  const handleChangeEditCategory = (e) => {
    setEditCategory({
      ...editCategory,
      keyword: e.target.value
    })
  }

  const handleKeyPressCategory = (e) => {
    if (e.key === "Enter") {
      handleAddCategory()
    }
  }

  const handleChangeSelectedCategory = (idx) => {
    setSelectedCategory(idx)
  }

  return (
    <PostContent>
      <div className="modal-input-wrapper">
        <Input 
          type="text" 
          name="keyword" 
          placeholder="검색.."
          ref={searchInputRef}
          value={editCategory.keyword} 
          onChange={handleChangeEditCategory}
          onKeyPress={handleKeyPressCategory} 
        />
        <Button 
          className="btn-none btn-sm" 
          onClick={handleAddCategory}
        >
          추가
        </Button>
      </div>
      {categoryList.map((one, i) => (
        <PostCategoryWrapper 
          key={i} 
          categoryIdx={i}
          selectedCategory={selectedCategory}
          handleChangeSelectedCategory={handleChangeSelectedCategory}
          {...one}  
        />
      ))}
    </PostContent>
  )
}

const PostContent = styled.div`
  .modal-input-wrapper {
    display: flex;
    justify-content: flex-end;
    margin: 1rem 0;
    input {
      width: 25rem;
    }
    button {
      width: 5rem;
    }
  }
`

export default PostContainer