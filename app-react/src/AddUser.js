import React from 'react'
import { css } from 'glamor'
import { graphql } from 'react-apollo'
import uuidV4 from 'uuid/v4'

import CreateUser from './mutations/CreateUser'

class AddUser extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
  }
  onChange = (key, value) => {
    this.setState({ [key]: value })
  }
  addUser = () => {
    const { name, email, password } = this.state
    this.props.onAdd({
      id: uuidV4(),
      email,
      password,
      name
    })
    this.setState({
      name: '',
      email: '',
      password: '',
    })
  }
  render() {
    return (
      <div {...css(styles.container)}>
        <h2>Create User</h2>
        <input
          value={this.state.name}
          onChange={evt => this.onChange('name', evt.target.value)}
          placeholder='User name'
          {...css(styles.input)}
        />
        <input
          value={this.state.email}
          onChange={evt => this.onChange('email', evt.target.value)}
          placeholder='Email'
          {...css(styles.input)}
        />
        <input
          value={this.state.password}
          onChange={evt => this.onChange('password', evt.target.value)}
          placeholder='Password'
          {...css(styles.input)}
        />
        <div {...css(styles.submitButton)} onClick={this.addUser}>
          <p>Add User</p>
        </div>
      </div>
    )
  }
}

export default graphql(CreateUser, {
  props: props => ({
    onAdd: user => props.mutate({
      variables: user,
      optimisticResponse: {
        __typename: 'Mutation',
        createUser: { ...user,  __typename: 'User' }
      },
      // update: (proxy, { data: { createUser } }) => {
      //   const data = proxy.readQuery({ query: ListUsers });
      //   data.listUsers.items.push(createUser);
      //   proxy.writeQuery({ query: ListUsers, data });
      // }
    })
  })
})(AddUser)

const styles = {
  button: {
    border: 'none',
    background: 'rgba(0, 0, 0, .1)',
    width: 250,
    height: 50,
    cursor: 'pointer',
    margin: '15px 0px'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 100,
    paddingRight: 100,
    textAlign: 'left'
  },
  input: {
    outline: 'none',
    border: 'none',
    borderBottom: '2px solid #00dd3b',
    height: '44px',
    fontSize: '18px',
  },
  textarea: {
    border: '1px solid #ddd',
    outline: 'none',
    fontSize: '18px'
  },
  submitButton: {
    backgroundColor: '#00dd3b',
    padding: '8px 30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: .85,
    cursor: 'pointer',
    ':hover': {
      opacity: 1
    }
  }
}
