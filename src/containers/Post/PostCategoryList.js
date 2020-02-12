import React, { useEffect, useState, useRef } from "react"

import styled from "styled-components"

import { Input } from "../../components/Element"
import baseStyles from "../../lib/style/base"


const initCategory = {
  keyword: ''
}


const PostCategoryList = (props) => {
  const {
    categoryList,
    handleAddCategory
  } = props


  const [category, setCategory] = useState(initCategory)
  const searchInputRef = useRef()


  useEffect(() => {
    searchInputRef.current.focus()
  }, [])


  const handleChangeCategory = (e) => {
    setCategory({
      ...category,
      keyword: e.target.value
    })
  }


  const handleKeyPressCategory = (e) => {
    if (e.key === "Enter") {
      handleAddCategory(category)
      setCategory(initCategory)
    }
  }


  return (
    <PostCategoryListContent>
      <div className="search-wrapper">
        <Input 
          type="text" 
          name="keyword" 
          placeholder="추가.."
          ref={searchInputRef}
          value={category.keyword} 
          onChange={handleChangeCategory}
          onKeyPress={handleKeyPressCategory} 
        />
      </div>
      <ul>
        {categoryList.map((one, i) => (
          <li key={i}><a href={`#${one.keyword}`}>{`#${one.keyword}`}</a></li>
        ))}
      </ul>
    </PostCategoryListContent>
  )
}


const PostCategoryListContent = styled.div`
  width: 250px;
  display: inline-block;
  position: fixed;
  padding-left: 0.5rem;
  .search-wrapper {
    display: flex;
    justify-content: flex-end;
    margin: 1rem 0;
    // input {
    //   width: 25rem;
    // }
    // button {
    //   width: 5rem;
    // }
  }
  >ul {
    list-style: none;
    padding-left: 0;
    >li {
      display: inline-block;
      padding: 0.3rem;
      >a {
        color: ${baseStyles.color.primary.active};
        font-weight: 550;
      }
    }
  }
`

export default PostCategoryList