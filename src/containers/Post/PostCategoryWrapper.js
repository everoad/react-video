import React, { useState, useEffect, useCallback } from "react"
import { useHistory } from "react-router-dom"

import styled from "styled-components"

import baseStyle from "../../lib/style/base"

import * as googleAPI from "../../services/googleAPI"

import PostItem from "./PostItem"



const PostCategoryWrapper = ({ keyword, categoryIdx, selectedCategory, handleChangeSelectedCategory }) => {
  const history = useHistory()
  const [videos, setVideos] = useState([])
  const [nextPageToken, setNextPageToken] = useState(null)
  const [height, setHeight] = useState(0)

  
  useEffect(() => {
    const selected = categoryIdx === selectedCategory
    if (selected) {
      window.addEventListener('scroll', handleScroll, true)
    } else {
      window.removeEventListener('scroll', handleScroll)
    }
    
    const getData = async () => {
      const res = await googleAPI.searchYoutubeVideos({
        q: keyword,
        maxResults: categoryIdx === selectedCategory ? 20 : 5,
        pageToken: nextPageToken
      })
      setVideos(videos.concat(res.data.items))
      setNextPageToken(res.data.nextPageToken)
    }

    getData()
  }, [ keyword, selectedCategory, height ])


  const handleScroll = useCallback(() => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    let clientHeight = document.documentElement.clientHeight
    if (scrollTop + clientHeight === scrollHeight) {
      setHeight(height + 1)
    }
  }, [height])

  const handleClickItem = (item) => {
    history.push(`/post/${item.id.videoId}?id=${item.snippet.channelId}`)
  }

  const onClickMoreBtn = () => {
    const selected = categoryIdx === selectedCategory
    handleChangeSelectedCategory(selected ? -1 : categoryIdx)
    if (selected) {

    }
  }

  return (
    <PostCategoryContent 
      categoryIdx={categoryIdx} 
      selectedCategory={selectedCategory}
    >
      <div>
        <span className="category-title">#{keyword}</span>
        <span className="category-more-btn" onClick={onClickMoreBtn}>
          {categoryIdx === selectedCategory ? '접기' : '더보기'}
        </span>
      </div>
      <div className="item-wrapper">
        {videos.map((item, i) => (<PostItem key={i} item={item} onClick={() => handleClickItem(item)} />))}
      </div>
    </PostCategoryContent>
  )
}

const visible = (props) => {
  const {
    categoryIdx, selectedCategory
  } = props
  return (selectedCategory === -1 || selectedCategory === categoryIdx) ? 'block' : 'none'
}

const PostCategoryContent = styled.div`
  display: ${props => visible(props)};
  .category-title {
    font-size: 1.2rem;
    font-weight 550;
    padding: 0.5rem;
    color: ${baseStyle.color.primary.active};
  }
  .category-more-btn {
    font-size: 0.9rem;
    cursor: pointer;
  }
  margin: 1rem 0 3rem 0;
`


export default PostCategoryWrapper