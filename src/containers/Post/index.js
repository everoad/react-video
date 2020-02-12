import React, { useState, useEffect } from "react"

import styled from "styled-components"

import PostCategory from "./PostCategory"
import PostViewer from "./PostViewer"
import PostCategoryList from "./PostCategoryList"


const mock = [
  { keyword: '장삐쭈' },
  { keyword: '노래모음' },
  { keyword: '축구' },
  { keyword: '농구' },
  { keyword: '리그오브레전드' },
]

function getStatus(idx, selectedIdx) {
  return selectedIdx === -1 ? 0 : selectedIdx !== idx ? 1 : 2
}

const PostContainer = () => {
  const [categoryList, setCategoryList] = useState(mock)
  const [selectedVideoId, setSelectedVideoId] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(-1)


  const handleAddCategory = (category) => {
    setCategoryList(categoryList.concat([ category ]))
  }


  const handleChangeSelectedCategory = (idx) => {
    setSelectedCategory(idx)
  }

  return (
    <PostContent>
      <div className="category-wrapper">
        {selectedVideoId && <PostViewer videoId={selectedVideoId} />}
        <div>
          {categoryList.map((one, i) => (
            <PostCategory 
              key={i}
              categoryIdx={i}
              status={getStatus(i, selectedCategory)}
              setVideoId={setSelectedVideoId}
              handleChangeSelectedCategory={handleChangeSelectedCategory}
              {...one}
            />
          ))}
        </div>
      </div>
      <PostCategoryList
        categoryList={categoryList}
        handleAddCategory={handleAddCategory}
      />
    </PostContent>
  )
}

const PostContent = styled.div`
  .category-wrapper {
    width: calc(100% - 250px);
    display: inline-block;
    vertical-align: top;
  }
`

export default PostContainer