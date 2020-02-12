import React, { memo, useState, useEffect, useCallback } from "react"
import ScrollableAnchor, { configureAnchors }  from 'react-scrollable-anchor'

import styled from "styled-components"

import baseStyle from "../../lib/style/base"

import * as googleAPI from "../../services/googleAPI"

import PostItem from "./PostItem"



configureAnchors({offset: -65, scrollDuration: 200})

const PostCategory = (props) => {
  const {
    status,
    categoryIdx,
    setVideoId,
    category,
    handleChangeSelectedCategory
  } = props

  const { keyword } = category

  const [videos, setVideos] = useState([])
  const [nextPageToken, setNextPageToken] = useState(null)
  const [height, setHeight] = useState(0)
  const [isLoading, setLoading] = useState(false)
  

  useEffect(() => {
    if (status !== 2) {
      window.removeEventListener('scroll', handleScroll)
    } else {
      window.addEventListener('scroll', handleScroll, true)
    }
    
    const getData = async () => {
      setLoading(true)
      const res = await googleAPI.searchYoutubeVideos({
        q: keyword,
        maxResults: status === 2 ? 20 : 4,
        pageToken: status === 2 ? nextPageToken : null
      })
      
      if (status === 2) {
        setVideos(videos.concat(res.data.items))
      } else {
        setVideos(res.data.items)
      }

      setLoading(false)
      setNextPageToken(res.data.nextPageToken)
    }


    getData()


    return () => {
      window.removeEventListener('scroll', handleScroll)
    }

  }, [ keyword, status, height ])


  const handleScroll = useCallback(() => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    let clientHeight = document.documentElement.clientHeight
    if (Math.round(scrollTop) + clientHeight === scrollHeight) {
      setHeight(height + 1)
    }
  }, [ height ])


  const handleClickItem = (item) => setVideoId(item.id.videoId)

  const handleClickMoreItems = () => handleChangeSelectedCategory(status === 2 ? -1 : categoryIdx)


  return (
    <PostCategoryContent status={status} id={keyword}>
      <ScrollableAnchor id={keyword}>
        <div>
          <span className="category-title">#{keyword}</span>
          <span className="category-more-btn" onClick={handleClickMoreItems}>
            {status === 2 ? '접기' : '더보기'}
          </span>
        </div>
      </ScrollableAnchor>
      <div className="item-wrapper">
        {isLoading ? 
        <div>Loading...</div>
        : 
        videos.map((item, i) => (<PostItem key={i} item={item} onClick={() => handleClickItem(item)} />))}
      </div>
    </PostCategoryContent>
  )
}

const visible = ({ status }) => {
  return (status === 0 || status === 2) ? 'block' : 'none'
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


export default PostCategory