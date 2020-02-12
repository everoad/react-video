import React, { useEffect, useState } from "react"

import styled from "styled-components"
import YouTube from "react-youtube"
import moment from "moment"


import * as googleAPI from "../../services/googleAPI"


const initVideo = { 
  title: '', 
  channelTitle: '', 
  description: '', 
  publishedAt: '' 
}


//const exp = /(((http(s)?:\/\/)\S+(\.[^(\n|\t|\s,)]+)+)|((http(s)?:\/\/)?(([a-zA-z\-_]+[0-9]*)|([0-9]*[a-zA-z\-_]+)){2,}(\.[^(\n|\t|\s,)]+)+))+/gi
const videoOptions = {
  width: '100%',
  height: '100%',
  playerVars: {
    autoplay: 0
  }
}

const PostViewer = ({ videoId }) => {
  const [video, setVideo] = useState(initVideo)
  const [openPopup, setOpenPopup] = useState(false)


  useEffect(() => {

    window.addEventListener('scroll', handleScroll, true)

    const getData = async () => {
      const res = await googleAPI.findYoubuteVideoList({
        id: videoId
      })
      if (res.data.items && res.data.items.length > 0) {
        setVideo(res.data.items[0].snippet)
      }
    }

    getData()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [videoId])


  const handleScroll = () => {
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    setOpenPopup(scrollTop !== 0)
    
  }


  return (
    <PostViewerContent>
      <div className="player-wrapper">
        <div className={`player-container ${openPopup ? 'move' : ''}`}>
          <div>
            <YouTube
              videoId={videoId}
              opts={videoOptions}
            />
          </div>
        </div>
      </div>

      <div className={`info-container ${openPopup ? 'move' : ''}`}>
        <div className="video-title">{video.title}</div>
        <div className="video-info">
          <span className="video-owner">{video.channelTitle}</span>
          <span className="video-date">{moment(video.publishedAt).format("YYYY/MM/DD")}</span>
        </div>
        <div className="video-description">
          {video.description.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
        </div>
      </div>
    </PostViewerContent>
  )
}


const PostViewerContent = styled.div`
  padding: 1rem;
  height: 0;
  padding-bottom: 35%;
  .player-wrapper {
    display: inline-block;
    vertical-align: top;
    margin: 0.5rem;
    width: calc(100% - 500px - 1rem);
    max-width: 888px;
    .player-container {
      width: 100%;
      max-width: 888px;
      >div {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
      }
      &.move {
        width: 400px;
        position: fixed !important;
        right: 0;
        bottom: 1rem;
      }
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
      }
    }

  }
  .info-container {
    display: inline-block;
    width: calc(500px - 1rem);
    overflow-y: auto;
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
      padding: 1rem 1rem 1rem 1.5rem;
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.1);
    }
  }
`

export default PostViewer