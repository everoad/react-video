import React from "react"

import styled from "styled-components"
import moment from "moment"

import baseStyle from "../../lib/style/base"


const PostItem = ({ item, onClick }) => {

  const {
    title,
    //channelId,
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
  // @media screen and (min-width: ${baseStyle.screenBoundWidth}px) {
  //   flex: 0 0 auto;
  //   width: calc(20% - 20px);
  //   height: 0;
  //   padding-bottom: 16%;
  // }
  // @media screen and (max-width: ${baseStyle.screenBoundWidth}px) {
    flex: 0 0 auto;
    width: calc(25% - 20px);
    height: 0;
    padding-bottom: 21%;
  // }
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
      //width: calc(85% - 0.8rem);
      //padding-left: 0.8rem;
      >div {
        padding-bottom: 0.1rem;
      }
      .video-title {
        font-size: 1.1rem;
        font-weight: 550;
        padding-bottom: 0.3rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }
    }
  }

`


export default PostItem