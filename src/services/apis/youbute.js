import axios from "axios"


export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    key: "AIzaSyB7zZUYxAtw94DZiJ77eUrfJFGVazuUHt4",
    type: "video"
  }
})