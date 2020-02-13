import React from "react"
import { Switch, Route } from "react-router-dom"

import AboutContainer from "./About"
import PostContainer from "./Post"
import HomeContainer from "./Home"


const MainRoutes = () => {
  return (
    <Switch>
      <Route path="/home" exact component={HomeContainer} />
      <Route path="/post" exact component={PostContainer} />
      <Route path="/about" component={AboutContainer} />
      <Route path="/test1" component={PostContainer} />
    </Switch>
  )
}


export default MainRoutes