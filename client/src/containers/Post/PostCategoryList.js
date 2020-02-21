import React, { useEffect, useState, useRef } from "react"

import styled from "styled-components"

import { Input } from "../../components/Element"
import baseStyles from "../../lib/style/base"


const initCategory = {
  id: -1,
  keyword: ''
}


const PostCategoryList = (props) => {
  const {
    categoryList,
    handleAddCategory,
    handleRemoveCategory,
    updateCategories
  } = props


  const [category, setCategory] = useState(initCategory)
  const overRef = useRef()
  const dragRef = useRef()
  const searchInputRef = useRef()


  useEffect(() => {
    searchInputRef.current.focus()
  }, [])


  const handleChangeCategory = (e) => {
    setCategory({
      id: categoryList.length + 1,
      keyword: e.target.value
    })
  }


  const handleKeyPressCategory = (e) => {
    if (e.key === "Enter") {
      handleAddCategory(category)
      setCategory(initCategory)
    }
  }


  const handleClickRemove = (item) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      handleRemoveCategory(item.id)
    }
  }


  const dragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move'
    let target
    if (e.target.tagName !== 'LI') {
      target = e.target.parentNode
    }
    else {
      target = e.target
    }
    if (target.tagName !== "LI") {
      return
    }
    dragRef.current = target
    dragRef.current.style.backgroundColor = "rgba(0,0,0,0.1)"
  }


  const endDrop = () => {
    //TODO 버그 체크.
    dragRef.current.style.backgroundColor = "rgba(0,0,0,0.05)"
    if (!overRef.current) {
      return
    }
    var from = Number(dragRef.current.dataset.id)
    var to = Number(overRef.current.dataset.id)
    if(from < to) to--
    categoryList.splice(to, 0, categoryList.splice(from, 1)[0])
    updateCategories(categoryList)
  }


  const dragOver = (e) => {
    e.preventDefault()
    //if(e.target.getAttribute("draggable") !== "true") return
    if(e.target.tagName !== "LI" || e.target.dataset.id === dragRef.current.dataset.id) return 
    overRef.current = e.target
    e.currentTarget.insertBefore(dragRef.current, e.target)
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
      <ul onDragOver={dragOver}>
        {categoryList.map((one, i) => (
          <li data-id={i} key={one.id} draggable="true" onDragStart={(e) => dragStart(e, one)} onDragEnd={endDrop}>
            <a href={`#${one.keyword}`}>{`# ${one.keyword}`}</a>
            <span onClick={() => handleClickRemove(one)}>×</span>
          </li>
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
      display: flex;
      justify-content: space-between;
      padding: 0.2rem 0.3rem;
      margin: 0.2rem;
      border-radius: 3px;
      background-color: rgba(0,0,0,0.05);
      >a {
        color: ${baseStyles.color.primary.active};
        font-weight: 550;
        width: 90%;
      }
      >span {
        font-weight: 550;
        cursor: pointer;
        width: 10%;
        text-align: center;
        &:hover {
          color: ${baseStyles.color.primary.active};
        }
      }
    }
    .placeholder {
      background: rgb(255,240,120);
      &:before {
        content: "Drop here";
        color: rgb(225,210,90);
      }
    }
  }
`


// const checkProps = (prev, next) => {
//   console.log(prev, next)
//   if (JSON.stringify(prev.categoryList) !== JSON.stringify(next.categoryList)) {
//     return false
//   }
//   return true
// }


export default PostCategoryList