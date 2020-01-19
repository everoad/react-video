import axios from "axios"

import youtubeAPI from "./apis/youbute"

export function getYoutubeVideos(params) {
  return youtubeAPI.get("/search", {
    params: {
      part: "snippet",
      key: "AIzaSyCl7d8Ikmu7fkFzpxmRV-cAvc8NqlJh_90",
      q: "장삐쭈",
      type: "video,channel",
      maxResults: 10
    }
  })
}

export function getVideo(params) {
  return youtubeAPI.get("/", {
    
  })
}