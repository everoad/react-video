import React from "react"
import { useHistory } from "react-router-dom"

import TopMenu from "./Layout/TopMenu"
import styled from "styled-components"

import baseStyle from "../lib/style/base"
import MainRoutes from "./routes"



const MainContainer = () => {
  const history = useHistory()
  if (window.location.pathname === "/") {
    history.push("/home")
  }
  return (
    <main>
      <TopMenu />
      <Body>
        <MainRoutes />
      </Body>
    </main>
  )
}


const Body = styled.div`
  margin-top: ${baseStyle.topMenuHeight}px;
  padding-top: 5px;
  padding-left: 25px;
  padding-right: 25px;
`

export default MainContainer