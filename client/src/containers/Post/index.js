import React, { useState, useEffect } from "react"

import styled from "styled-components"

import PostCategory from "./PostCategory"
import PostViewer from "./PostViewer"
import PostCategoryList from "./PostCategoryList"


const mockData = [
  { id: 1, keyword: '노마드코더' },
  { id: 2, keyword: '노래모음' },
  { id: 3, keyword: '축구' },
  { id: 4, keyword: '농구' },
  { id: 5, keyword: '리그오브레전드' },
]


/*
  status
  0 : 선택된 카테고리가 없을 경우
  1 : 선택된 카테고리가 자신이 아닐 경우
  2 : 선택된 카테고리가 자신일 경우
*/
const getStatus = (idx, selectedIdx) => (selectedIdx === -1) ? 0 : (selectedIdx !== idx) ? 1 : 2


const PostContainer = () => {
  const [categoryList, setCategoryList] = useState([])
  const [selectedVideoId, setSelectedVideoId] = useState(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1)


  const handleAddCategory = (category) => {
    setCategoryList(v => v.concat([ category ]))
  }


  const handleRemoveCategory = (id) => {
    // 선택된 카테고리가 삭제될 경우 초기화.
    setSelectedCategoryId(v => v === id ? -1 : v)
    setCategoryList(v => v.filter(one => one.id !== id))
  }

  
  useEffect(() => {
    // TODO 서버에서 조회하는 것으로 변경.
    setCategoryList(v => v.concat(mockData))
  }, [])


  return (
    <PostContent>
      <div className="category-wrapper">
        {selectedVideoId && <PostViewer videoId={selectedVideoId} setVideoId={setSelectedVideoId} />}
        <div>
          {categoryList.map(one => (
            <PostCategory 
              key={one.id}
              status={getStatus(one.id, selectedCategoryId)}
              setVideoId={setSelectedVideoId}
              handleChangeSelectedCategoryId={setSelectedCategoryId}
              category={one}
            />
          ))}
        </div>
      </div>
      <PostCategoryList
        categoryList={categoryList}
        handleAddCategory={handleAddCategory}
        handleRemoveCategory={handleRemoveCategory}
        setCategoryList={setCategoryList}
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