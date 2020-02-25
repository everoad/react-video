import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { SchemaLink } from "apollo-link-schema"
import { makeExecutableSchema } from "graphql-tools"


const wait = (ms) => new Promise(resolve => setInterval(resolve, ms))

const typeDefs = `
  type Query {
    ping: Ping! 
    categories: [ Category ]
  }

  type Mutation {
    updatePing(text: String): Ping
    addCategory(id: Int, keyword: String): Category
    removeCategory(id: Int): Category
    updateCategories(categories: String): [ Category ]
  }

  type Ping {
    text: String
  }

  type Category {
    id: Int!
    keyword: String!
  }

`

const mockData = [
  { id: 1, keyword: "노마드코더" }
]


const resolvers = {
  Query: {
    async ping() {
      return JSON.parse(localStorage.getItem("ping")) || { text: "Hello World" }
    },
    async categories() {
      await wait(1000)
      let categories = localStorage.getItem("categories")
      if (categories) {
        return JSON.parse(localStorage.getItem("categories"))
      } else {
        localStorage.setItem("categories", JSON.stringify(mockData))
        return mockData
      }
    }
  },
  Mutation: {
    updatePing(_, { text }) {
      var ping = { text }
      localStorage.setItem("ping", JSON.stringify(ping))
      return ping
    },

    addCategory(_, variables) {
      const categories = JSON.parse(localStorage.getItem("categories"))
      categories.push(variables)
      localStorage.setItem("categories", JSON.stringify(categories))
      return variables
    },

    removeCategory(_, variables) {
      const categories = JSON.parse(localStorage.getItem("categories"))
      localStorage.setItem("categories", JSON.stringify(categories.filter(v => v.id !== variables.id)))
      return variables
    },

    updateCategories(_, { categories }) {
      localStorage.setItem("categories", categories)
      return JSON.parse(categories)
    }
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })


const client = new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache()
})

export default client