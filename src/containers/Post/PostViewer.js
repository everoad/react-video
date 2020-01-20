import React, { useEffect, useState } from "react"

import styled from "styled-components"
import YouTube from 'react-youtube'
import moment from "moment"

import * as googleAPI from "../../services/googleAPI"


const initVideo = { 
  title: '', 
  channelTitle: '', 
  description: '', 
  publishedAt: '' 
}

const PostViewer = ({match, location}) => {
  const [video, setVideo] = useState(initVideo)

  const { videoId } = match.params

  const videoOptions = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0
    }
  }


  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await googleAPI.findYoubuteVideoList({
      id: videoId
    })
    if (res.data.items && res.data.items.length > 0) {
      setVideo(res.data.items[0].snippet)
    }
  }


  return (
    <PostViewerContent>
      <div className="container">
        <div className="player-container">
          <YouTube
            videoId={videoId}
            opts={videoOptions}
          />
        </div>
        <div className="video-title">{video.title}</div>
        <div>{video.channelTitle}|{moment(video.publishedAt).format("YYYY/MM/DD")}</div>
        <div>{video.description}</div>
      </div>
      <div className="list-wrapper">
        PostList!!
      </div>
    </PostViewerContent>
  )
}


const PostViewerContent = styled.div`
  padding: 2rem;
  .container {
    display: inline-block;
    vertical-align: top;
    margin: 0.5rem;
    width: calc(100% - 500px - 1rem);
    .player-container {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 56.25%;
    }
    .video-title {
      font-size: 1.2rem;
      font-weight: 550;
      padding: 0.5rem;
    }
  }
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
  .list-wrapper {
    display: inline-block;
    width: calc(500px - 1rem);
    margin: 0.5rem;
    box-shadow: 0px 0px 2px #555;
  }
`

export default PostViewer