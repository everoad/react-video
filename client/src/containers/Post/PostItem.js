import React from "react"

import styled from "styled-components"
import moment from "moment"


const PostItem = ({ item, onClick }) => {

  const {
    title,
    channelTitle,
    publishedAt,
    thumbnails
  } = item.snippet

  return (
    <PostItemContent>
      <img src={thumbnails.medium.url} width="100%" onClick={onClick} alt="test" />
      <div>
        {/* <div className="profile">
          <div></div>
        </div> */}
        <div className="description">
          <div className="video-title" title={title} onClick={onClick}>{title}</div>
          <div>{channelTitle}</div>
          <div>{moment(publishedAt).format("YY/MM/DD")}</div>
        </div>
      </div>
    </PostItemContent>
  )
}


const PostItemContent = styled.div`
  margin: 10px;
  display: inline-block;
  vertical-align: top;
  flex: 0 0 auto;
  width: calc(25% - 20px);
  height: 0;
  padding-bottom: 21%;
  >img {
    cursor: pointer;
  }
  >div {
    padding: 0.5rem;
    .profile {
      vertical-align: top;
      display: inline-block;
      width: 15%;
      >div {
        // background-image: url(${props => props.url});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        border-radius: 50%;
      }
    }
    .description {
      display: inline-block;
      width: 100%;
      >div {
        padding-bottom: 0.1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .video-title {
        font-size: 1.1rem;
        font-weight: 550;
        padding-bottom: 0.3rem;
        cursor: pointer;
      }
    }
  }

`


export default PostItem