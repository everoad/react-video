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


const mock = function () {
  var arr = []
  for (let i = 0; i < 20; i++) {
    arr.push({
      title: `Hello World${i}`
    })
  }
  return arr
} ()


const HorizonalVideoItem = ({ item }) => {
  return (
    <HorizonalVideoItemContent>
      {item.title}
    </HorizonalVideoItemContent>
  )
}

const HorizonalVideoItemContent = styled.div`
  width: 100%;
  height: 6rem;
  box-shadow: 0px 0px 1px #555 inset;
`
const exp = /(((http(s)?:\/\/)\S+(\.[^(\n|\t|\s,)]+)+)|((http(s)?:\/\/)?(([a-zA-z\-_]+[0-9]*)|([0-9]*[a-zA-z\-_]+)){2,}(\.[^(\n|\t|\s,)]+)+))+/gi


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
        <div className="video-info">
          <span className="video-owner">{video.channelTitle}</span>
          <span className="video-date">{moment(video.publishedAt).format("YYYY/MM/DD")}</span>
        </div>
        <div className="video-description">
          {video.description.split('\n').map(line => <span>{line}<br/></span>)}
        </div>
      </div>
      <div className="list-wrapper">
        {mock.map((one, i) => <HorizonalVideoItem key={i} item={one} />)}
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
      padding: 1rem 0.5rem;
    }
    .video-info {
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.1);
      padding-bottom: 1rem;
    }
    .video-owner {
      padding: 0 0.5rem;
    }
    .video-date {
      padding: 0 0.5rem;
    }
    .video-description {
      padding: 1rem 1rem 1rem 2rem;
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.1);
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
    height: 450px;
    overflow-y: auto;
  }
`

export default PostViewer