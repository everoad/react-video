import React, { memo, useState, useEffect, useCallback } from "react"
import ScrollableAnchor, { configureAnchors }  from 'react-scrollable-anchor'

import styled from "styled-components"
import { debounce } from "lodash"

import Loading from "../../components/Loading"

import baseStyle from "../../lib/style/base"

import * as googleAPI from "../../services/googleAPI"

import PostItem from "./PostItem"


configureAnchors({offset: -65, scrollDuration: 200})


const mapItemsToComponent = (items, setVideoId) => {
  return items.map((item, i) => (<PostItem key={i} item={item} onClick={() => setVideoId(item.id.videoId)} />))
}


const PostCategory = (props) => {
  const {
    status,
    setVideoId,
    category,
    handleChangeSelectedCategoryId
  } = props
  const { keyword, id } = category


  const [videos, setVideos] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [nextPageToken, setNextPageToken] = useState(null)
  const [search, setSearch] = useState({
    q: keyword,
    pageToken: null,
    maxResults: 16
  })


  const handleScroll = useCallback(debounce(() => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    let clientHeight = document.documentElement.clientHeight
    if (Math.round(scrollTop) + clientHeight === scrollHeight) {
      setSearch(v => ({
        ...v,
        pageToken: nextPageToken
      }))
    }
  }, 500), [nextPageToken])


  const handleClickMoreItems = () => {
    handleChangeSelectedCategoryId(status === 2 ? -1 : id)
  }


  useEffect(() => {
    if (status !== 2) {
      window.removeEventListener('scroll', handleScroll, true)
    } else {
      window.addEventListener('scroll', handleScroll, true)
    }
    return () => {
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [status, handleScroll])


  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const res = await googleAPI.searchYoutubeVideos(search)
      setVideos(v => v.concat(res.data.items))
      setNextPageToken(res.data.nextPageToken)
      setLoading(false)
    }
    getData()
  }, [search])


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
        {mapItemsToComponent(status === 2 ? videos : videos.slice(0, 4), setVideoId)}
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
  margin: 1rem 0 1rem 0;
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
    min-height: 5rem;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`


const checkProps = (prev, next) => {
  if (prev.status !== next.status) {
    return false
  }
  
  if (prev.category.id !== next.category.id) {
    return false
  }
  
  return true
}


export default memo(PostCategory, checkProps)