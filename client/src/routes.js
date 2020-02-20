import React, { Suspense, Fragment } from "react"
import { Switch, Route, BrowserRouter } from "react-router-dom"

import MainContainer from "./containers"
//import LoginContainer from "./containers/Login"

//import PrivateRoute from "./components/PrivateRoute"
import Loading from "./components/Loading"

const Routes = () => {

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading/>}>
        <Fragment>
          <Switch>
            <Route path="/" component={MainContainer}/>
            {/* <Route path="/login" component={LoginContainer} />
            <PrivateRoute path="/" component={MainContainer} /> */}
          </Switch>
        </Fragment>
      </Suspense>
    </BrowserRouter>
  )
}


export default Routes