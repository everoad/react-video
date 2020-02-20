import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { SchemaLink } from "apollo-link-schema"
import { makeExecutableSchema } from "graphql-tools"

const typeDefs = `
  type Query {
    ping: Ping! 
  }

  type Mutation {
    updatePing: Mutation
  }

  type Ping {
    text: String
  }
`
const resolvers = {
  Query: {
    async ping() {

      return {
        text: "Hello World"
      }
    }
  },
  Mutation: {
    async updatePing(a,b,c,d,e) {
      console.log(a,b,c,d,e)
    }
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })


const client = new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache()
})

export default client