import youtubeAPI from "./apis/youbute"

export function getYoutubeVideos(params) {
  return youtubeAPI.get("/search", {
    params: params
  })
}