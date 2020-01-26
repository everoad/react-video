import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

import styled from "styled-components"

import * as googleAPI from "../../services/googleAPI"

import PostItem from "./PostItem"
import { Button } from "../../components/Element"



const PostCategoryWrapper = ({type, keyword }) => {
  const history = useHistory()
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const getData = async () => {
      const res = await googleAPI.searchYoutubeVideos({
        q: keyword
      })
  
      const items = res.data.items.filter(item => {
        if (item.id.kind.indexOf('video') > -1) {
          return true
        } else {
          return false
        }
      })
      setVideos(items)
    }

    getData()
  }, [ keyword ])

  
  const handleClickItem = (item) => {
    history.push(`/post/${item.id.videoId}?id=${item.snippet.channelId}`)
  }

  return (
    <PostCategoryContent>
      <div>
        <span className="category-title">{keyword}</span>
      </div>
      <div className="item-wrapper">
        {videos.map((item, i) => (<PostItem key={i} item={item} onClick={() => handleClickItem(item)} />))}
      </div>
    </PostCategoryContent>
  )
}


const PostCategoryContent = styled.div`
  .category-title {
    font-size: 1.2rem;
    font-weight 550;
    padding: 0.5rem;
  }
  .item-wrapper {
    overflow-x: auto;
    display: flex;
    flex-wrap: nowrap;
  }
  margin: 1rem 0 3rem 0;
`


export default PostCategoryWrapper