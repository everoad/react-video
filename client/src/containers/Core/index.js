import React from "react"


import LoginContainer from "../Login"

class Core extends React.Component {
  
  state = {
    login: {
      open: false
    }
  }

  render() {
    const {
      login
    } = this.state

    return (
      <>
        {login.open && LoginContainer}
      </>
    )
  }
}


export default Core