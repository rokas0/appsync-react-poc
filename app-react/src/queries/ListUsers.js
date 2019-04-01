import gql from 'graphql-tag';
 
export default gql`
query listUsers {
  listUsers  {
      name
      id
      email
      password
  }
}`