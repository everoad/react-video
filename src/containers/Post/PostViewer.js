import React from "react"

import styled from "styled-components"
import YouTube from 'react-youtube'

const PostViewer = ({match, location}) => {
  const { videoId } = match.params

  const videoOptions = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0
    }
  }

  return (
    <PostViewerContent>
      <div className="video-wrapper">
        <YouTube
          videoId={videoId}
          opts={videoOptions}
        />
      </div>
      <div className="list-wrapper">
        PostList!!
      </div>
    </PostViewerContent>
  )
}


const PostViewerContent = styled.div`
  padding: 2rem;
  .video-wrapper {
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 500px - 1rem);
    margin: 0.5rem;
  }
  .list-wrapper {
    display: inline-block;
    width: calc(500px - 1rem);
    margin: 0.5rem;
    box-shadow: 0px 0px 2px #555;
  }
`

export default PostViewer