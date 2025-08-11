import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', isError: false}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 100})
    history.replace('/')
    this.setState({isError: false})
  }

  onSubmitFailure = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, isError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <div className="login-website-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="login-website-logo"
            />
          </div>
          <label htmlFor="username" className="login-page-labels">
            USERNAME
          </label>
          <input
            placeholder="Username"
            type="text"
            value={username}
            className="login-inputs"
            id="username"
            onChange={this.onChangeUsernameInput}
          />
          <label htmlFor="password" className="login-page-labels">
            PASSWORD
          </label>
          <input
            placeholder="Password"
            type="password"
            value={password}
            className="login-inputs"
            id="password"
            onChange={this.onChangePasswordInput}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {isError ? <p className="login-error-msg">{errorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}

export default Login
