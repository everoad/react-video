import gql from "graphql-tag"



const GET_CATEGORIES = gql`
  query {
    categories {
      id
      keyword
    }
  }
`

const ADD_CATEGORY = gql`
  mutation addCategory($id: Int, $keyword: String) {
    addCategory(id: $id, keyword: $keyword) {
      id
      keyword
    }
  }
`

const REMOVE_CATEGORY = gql`
  mutation removeCategory($id: Int) {
    removeCategory(id: $id) {
      id
    }
  }
`

const UPDATE_CATEGORIES = gql`
  mutation updateCategories($categories: String) {
    updateCategories(categories: $categories) {
      id,
      keyword
    }
  }
`


export {
  ADD_CATEGORY,
  GET_CATEGORIES,
  REMOVE_CATEGORY,
  UPDATE_CATEGORIES
}