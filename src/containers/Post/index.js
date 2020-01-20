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
    let channelInfo
    const res = await googleAPI.searchYoutubeVideos({
      q: "장삐쭈"
    })
    const items = res.data.items.filter(item => {
      if (item.id.kind.indexOf('video') > -1) {
        return true
      } else {
        channelInfo = item
        return false
      }
    })
    items.forEach(item => item.channelInfo = channelInfo)
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