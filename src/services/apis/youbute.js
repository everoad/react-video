import axios from "axios"


export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    key: "AIzaSyCl7d8Ikmu7fkFzpxmRV-cAvc8NqlJh_90",
    type: "video,channel",
    maxResults: 10,
  }
})