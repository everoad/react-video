import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import styled from "styled-components"

import PostCategory from "./PostCategory"
import PostViewer from "./PostViewer"
import PostCategoryList from "./PostCategoryList"

import Loading from "../../components/Loading"

import { 
  GET_CATEGORIES, 
  ADD_CATEGORY, 
  UPDATE_CATEGORIES, 
  REMOVE_CATEGORY 
} from "../../services/query/Category"



/*
  status
  0 : 선택된 카테고리가 없을 경우
  1 : 선택된 카테고리가 자신이 아닐 경우
  2 : 선택된 카테고리가 자신일 경우
*/
const getStatus = (idx, selectedIdx) => (selectedIdx === -1) ? 0 : (selectedIdx !== idx) ? 1 : 2


const PostContainer = () => {
  const [selectedVideoId, setSelectedVideoId] = useState(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1)

  const { data, loading } = useQuery(GET_CATEGORIES)
  
  const [addCategory] = useMutation(ADD_CATEGORY, {
    update(cache, { data: { addCategory } }) {
      const { categories } = cache.readQuery({ query: GET_CATEGORIES })     
      cache.writeQuery({
        query: GET_CATEGORIES,
        data: { categories: [ ...categories, addCategory ] }
      })
    }
  })


  const [removeCategory] = useMutation(REMOVE_CATEGORY, {
    update(cache, { data: { removeCategory }}) {
      const { categories } = cache.readQuery({ query: GET_CATEGORIES })
      cache.writeQuery({
        query: GET_CATEGORIES,
        data: { categories: categories.filter(v => v.id !== removeCategory.id) }
      })
    }
  })


  const [updateCategories] = useMutation(UPDATE_CATEGORIES, {
    update(cache, { data: { updateCategories }}) {
      cache.writeQuery({
        query: GET_CATEGORIES,
        data: { categories: updateCategories }
      })
    }
  })

  
  const handleAddCategory = (category) => addCategory({ variables: category })


  const handleUpdateCategories = (categories) => updateCategories({ variables : { categories: JSON.stringify(categories)} })
  
  
  const handleRemoveCategory = (id) => {
    // 선택된 카테고리가 삭제될 경우 초기화.
    setSelectedCategoryId(v => v === id ? -1 : v)
    removeCategory({ variables: { id } })
  }
    

  if (loading) return <Loading screen={true} />
    
  return (
    <PostContent>
      <div className="category-wrapper">
        {selectedVideoId && <PostViewer videoId={selectedVideoId} setVideoId={setSelectedVideoId} />}
        <div>
          {
            data.categories.length > 0 ? 
            data.categories.map(one => (
              <PostCategory 
                key={one.id}
                status={getStatus(one.id, selectedCategoryId)}
                setVideoId={setSelectedVideoId}
                handleChangeSelectedCategoryId={setSelectedCategoryId}
                category={one}
              />
            ))
            :
            <div className="no-category">
              카테고리를 추가해 주세요.
            </div>
          }
        </div>
      </div>
      <PostCategoryList
        categoryList={data.categories}
        handleAddCategory={handleAddCategory}
        handleRemoveCategory={handleRemoveCategory}
        updateCategories={handleUpdateCategories}
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
  .no-category {
    width: 100%;
    padding: 5rem 0;
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
  }
`

export default PostContainer