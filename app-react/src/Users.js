import React from 'react'

import { css } from 'glamor'
import { graphql, compose } from 'react-apollo'
import ListUsers from './queries/ListUsers'
import { isError } from 'util';
import DeleteUser from './mutations/DeleteUser';
import _ from 'underscore';
import update from 'react-addons-update';

class Users extends React.Component {
  render() {
    return (
      <div {...css(styles.container)}>
        <h1>Users</h1>
        {
          this.props.users.map((r, i) => (
            <div {...css(styles.user)} key={i}>
              <p {...css(styles.title)}>User name: {r.name}</p>
              <p {...css(styles.title)}>Emails: {r.email}</p>
              <p {...css(styles.title)}>Passwords: {r.password}</p>
              <button onClick={() => this.props.onDelete(r)}>Delete</button>
            </div>
          ))
        }
      </div>
    )
  }
}

const styles = {
  title: {
    fontSize: 16
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .5)'
  },
  user: {
    boxShadow: '2px 2px 5px rgba(0, 0, 0, .2)',
    marginBottom: 7,
    padding: 14,
    border: '1px solid #ededed'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 100,
    paddingRight: 100,
    textAlign: 'left'
  }
}

export default compose(
  graphql(ListUsers, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      users: props.data.listUsers ? props.data.listUsers : [],
    })
  }),
  graphql(DeleteUser, {
    props: props => ({
      onDelete: user => {
        return props.mutate({
          variables: {'id': user.id},
          optimisticResponse: {
            __typename: 'Mutation',
            deleteUser: { id: user.id,  __typename: 'User' }
          },
        }).then(() => alert('Deleted but needs page refresh. TODO: Add a local state update'))
      }
    })
  })
)(Users)
