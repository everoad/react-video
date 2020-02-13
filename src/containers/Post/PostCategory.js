import React, { memo, useState, useEffect, useCallback } from "react"
import ScrollableAnchor, { configureAnchors }  from 'react-scrollable-anchor'

import styled from "styled-components"
import { debounce } from "lodash"

import Loading from "../../components/Loading"

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
  const [isLoading, setLoading] = useState(true)
  const [nextPageToken, setNextPageToken] = useState(null)
  

  const handleScroll = debounce(() => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    let clientHeight = document.documentElement.clientHeight
    if (Math.round(scrollTop) + clientHeight === scrollHeight) {
      setLoading(true)
    }
  }, 800)


  const getData = useCallback(async () => {
    const res = await googleAPI.searchYoutubeVideos({
      q: keyword,
      maxResults: status === 2 ? 20 : 4,
      pageToken: status === 2 ? nextPageToken : null
    })
    
    if (status === 2) {
      setVideos(v => v.concat(res.data.items))
    } else {
      setVideos(res.data.items)
    }

    setNextPageToken(res.data.nextPageToken)
    setLoading(false)

  }, [keyword, nextPageToken, status])


  const handleClickMoreItems = () => handleChangeSelectedCategory(status === 2 ? -1 : categoryIdx)


  useEffect(() => {
    if (status !== 2) {
      window.removeEventListener('scroll', handleScroll, true)
    } else {
      window.addEventListener('scroll', handleScroll, true)
    }
    if (status !== 1) {
      setLoading(true)
    }
    return () => {
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [status, handleScroll])


  useEffect(() => {
    if (isLoading) {
      getData()
    }
  }, [isLoading, getData])


  return (
    <PostCategoryContent status={status}>
      <ScrollableAnchor id={keyword}>
        <div>
          <span className="category-title">#{keyword}</span>
          <span className="category-more-btn" onClick={handleClickMoreItems}>
            {status === 2 ? '접기' : '더보기'}
          </span>
        </div>
      </ScrollableAnchor>
      <div className="item-wrapper">
        {videos.map((item, i) => (<PostItem key={i} item={item} onClick={() => setVideoId(item.id.videoId)} />))}
        <div className="loading-wrapper">
          {isLoading ? <Loading /> : null}
        </div>
      </div>
    </PostCategoryContent>
  )
}

const visible = ({ status }) => {
  return (status === 0 || status === 2) ? 'block' : 'none'
}

const PostCategoryContent = styled.div`
  display: ${props => visible(props)};
  margin: 1rem 0 3rem 0;
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
  .loading-wrapper {
    min-height: 10rem;
  }
`

const checkProps = (prev, next) => {
  return (prev.status === next.status)
}

export default memo(PostCategory, checkProps)