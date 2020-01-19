import React from "react"
import { Switch, Route } from "react-router-dom"

import AboutContainer from "./About"
import PostContainer from "./Post"
import PostViewer from "./Post/PostViewer"
import HomeContainer from "./Home"

const MainRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomeContainer} />
      <Route path="/post" exact component={PostContainer} />
      <Route path="/post/:videoId" exact component={PostViewer} />
      <Route path="/about" component={AboutContainer} />
      <Route path="/test1" component={PostContainer} />
    </Switch>
  )
}


export default MainRoutes