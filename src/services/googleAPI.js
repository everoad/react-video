import youtubeAPI from "./apis/youbute"

export function searchYoutubeVideos(params) {
  return youtubeAPI.get("/search", {
    params: params
  })
}

export function findYoubuteVideoList(params) {
  return youtubeAPI.get("/videos", {
    params: params
  })
}