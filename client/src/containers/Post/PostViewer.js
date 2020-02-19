import React, { memo, useEffect, useState, useCallback } from "react"

import styled from "styled-components"
import YouTube from "react-youtube"
import moment from "moment"
import { debounce } from "lodash"

import * as googleAPI from "../../services/googleAPI"
import baseStyles from "../../lib/style/base"


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

const PostViewer = ({ videoId, setVideoId }) => {
  const [video, setVideo] = useState(initVideo)
  const [openPopup, setOpenPopup] = useState(false)


  const handleScroll = useCallback(debounce(() => {
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    setOpenPopup(scrollTop !== 0)
  }, 300), [])


  const handleCloseViewer = () => {
    setVideoId(null)
  }


  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true)
    return () => {
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [handleScroll])


  useEffect(() => {
    const getData = async () => {
      const res = await googleAPI.findYoubuteVideoList({
        id: videoId
      })
      if (res.data.items && res.data.items.length > 0) {
        setVideo(res.data.items[0].snippet)
        handleScroll()
      }
    }
    getData()
  }, [videoId, handleScroll])


  return (
    <PostViewerContent>
      <div>
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
          <header className="info-header">
            <div className="profile">
              <div></div>
            </div>
            <div className="video-title">{video.title}</div>
            <div className="video-info">
              <span className="video-owner">{video.channelTitle}</span>
              <span className="video-date">{moment(video.publishedAt).format("YYYY/MM/DD")}</span>
            </div>
          </header>
          <div className="video-description">
            {video.description.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
          </div>
        </div>
      </div>
      <div className="player-close">
        <span onClick={handleCloseViewer}>닫기</span>
      </div>
    </PostViewerContent>
  )
}


const PostViewerContent = styled.div`
  padding: 1rem;
  min-height: 300px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.1);
  >div {
    display: flex;
    justify-content: center;
  }
  .player-wrapper {
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
    width: calc(500px - 1rem);
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
      height: 132px;
      overflow-y: auto;
      padding: 1rem 1rem 1rem 1.5rem;
    }
  }
  .player-close {
    width: 100%;
    text-align: center;
    margin: 0.5rem 0 1rem;
    >span {
      cursor: pointer;
      color: ${baseStyles.color.primary.active};
    }
  }
`

const checkProps = (prev, next) => {
  return prev.videoId === next.videoId
}

export default memo(PostViewer, checkProps)