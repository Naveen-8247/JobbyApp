import './index.css'
import {Redirect, Component} from 'react'
import Cookies from 'js-cookie'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  OnChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  OnChangePassword = event => {
    this.setState({password: event.target.value})
  }

  OnSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  SubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userdetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userdetails)}
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.OnSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state

    if (Cookies.get('jwt_token')) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.SubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <div className="userinput-container">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              value={username}
              onChange={this.OnChangeUsername}
            />
          </div>

          <div className="passwordinput-container">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={this.OnChangePassword}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
