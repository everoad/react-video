import axios from "axios"

//AIzaSyB7zZUYxAtw94DZiJ77eUrfJFGVazuUHt4
//AIzaSyCl7d8Ikmu7fkFzpxmRV-cAvc8NqlJh_90
export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    key: "AIzaSyCl7d8Ikmu7fkFzpxmRV-cAvc8NqlJh_90",
    type: "video"
  }
})