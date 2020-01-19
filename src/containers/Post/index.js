import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

import * as googleAPI from "../../services/googleAPI"

import styled from "styled-components"

import baseStyle from "../../lib/style/base"

import PostItem from "./PostItem"


const PostContainer = () => {
  const [videos, setVideos] = useState([])
  const history = useHistory()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await googleAPI.getYoutubeVideos()
    let channelInfo
    const items = res.data.items.filter(one => {
      if (one.id.kind.indexOf('video') > -1) {
        return true
      } else {
        channelInfo = one
        return false
      }
    })
    items.forEach(one => one.channelInfo = channelInfo)
    setVideos(items)
  }


  const handleClickItem = (item) => {
    history.push(`/post/${item.id.videoId}?id=${item.snippet.channelId}`)
  }


  return (
    <PostContent>
      <h3>Post!!!!</h3>
      {videos.map((item, i) => (<PostItem key={i} item={item} onClick={() => handleClickItem(item)} />))}
    </PostContent>
  )
}

const PostContent = styled.div`

`

export default PostContainer