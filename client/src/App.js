import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import client from "./apolloClient"


import Routes from "./routes"


function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  )
}

export default App
