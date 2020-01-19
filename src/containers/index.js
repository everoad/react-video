import React from "react"

import TopMenu from "./Layout/TopMenu"
import styled from "styled-components"

import baseStyle from "../lib/style/base"
import MainRoutes from "./routes"



const MainContainer = () => {
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
  margin-bottom: 50px;
  padding-top: 5px;
  padding-left: 25px;
  padding-right: 25px;
`

export default MainContainer