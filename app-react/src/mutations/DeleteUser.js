import gql from 'graphql-tag'
 
export default gql`
  mutation deleteUser(
      $id: ID!
    ) {
    deleteUser(input: {
      id: $id, 
    }) {
      id
      name
      password
      email
    }
  }
`
