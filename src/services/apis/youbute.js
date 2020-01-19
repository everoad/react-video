import axios from "axios"


export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    key: "AIzaSyB2yW5kWXb56WuexljgkVxoC_Vjf_XBjSQ",
    maxResults: 5
  }
})