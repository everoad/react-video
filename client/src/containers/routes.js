import React from "react"
import { Switch, Route } from "react-router-dom"


import menu from "../menu"

const MainRoutes = () => {
  return (
    <Switch>
      {menu.map((item, i) => (<Route key={i} path={item.url} exact component={item.component} />))}
    </Switch>
  )
}


export default MainRoutes