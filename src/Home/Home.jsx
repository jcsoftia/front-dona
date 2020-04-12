import React, { Component } from 'react'
import Map from '../Shared/Components/UIElements/Map'
import LoadingSpinner from '../Shared/Components/UIElements/LoadingSpinner'
class Home extends Component {
  _isMounted = false;

  state = {
    users: undefined,
    loading: true,
    error: null
  }

  getUsers = async () => {
    try {
      const response = await fetch('https://back-dona.herokuapp.com/users', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      if (this._isMounted === true) {
        const users = await response.json()
        console.log(users);
        this.setState({ users, loading: false })
      }
    } catch (error) {
      console.log('my error', error);
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.getUsers()
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {
    if (this.state.loading === true && !this.state.users ) {
      return <LoadingSpinner asOverlay/>;
    }

    if (this.state.error) {
      return <p>Error: ${this.state.error.message}</p>;
    }
    return (
      <Map users={this.state.users} location={{lat:  -9.860821,
        lng: -75.164101}}/>
    )
  }
}

export default Home
