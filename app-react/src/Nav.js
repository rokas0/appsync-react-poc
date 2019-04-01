import React from 'react'
import { Link } from 'react-router-dom'
import { css } from 'glamor'

export default class Nav extends React.Component {
  render() {
    return (
      <div {...css(styles.container)}>
        <h1 {...css(styles.heading)}>User App</h1>
        <Link to='/' {...css(styles.link)}>Users</Link>
        <Link to='/admin/create' {...css(styles.link)}>Add User</Link>
      </div>
    )
  }
}

const styles = {
  link: {
    textDecoration: 'none',
    marginLeft: 15,
    color: 'white',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  container: {
    display: 'flex',
    backgroundColor: '#00c334',
    padding: '0px 30px',
    alignItems: 'center'
  },
  heading: {
    color: 'white',
    paddingRight: 20
  }
}