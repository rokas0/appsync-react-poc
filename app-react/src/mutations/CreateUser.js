import gql from 'graphql-tag'
 
export default gql`
  mutation createUser(
      $name: String!,
      $email: String!,
      $password: String!
    ) {
    createUser(input: {
      name: $name, email: $email, password: $password, 
    }) {
      id
      name
      password
      email
    }
  }
`
