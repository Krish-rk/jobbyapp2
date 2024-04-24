import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: '',
    showErr: false,
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  loginFailure = errmsg => {
    this.setState({
      error: errmsg,
      showErr: true,
    })
  }

  loginSuccess = data => {
    const {history} = this.props
    const jwtToken = data.jwt_token
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.loginSuccess(data)
    } else {
      const data = await response.json()

      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErr, error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.onLogin}>
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              onChange={this.onChangeUsername}
              value={username}
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              onChange={this.onChangePassword}
              value={password}
            />
            <button type="submit">Login</button>
            {showErr && <p>{error}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
