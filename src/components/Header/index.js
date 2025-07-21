import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

class Header extends Component {
  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <nav className="header-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>

        <ul className="nav-links-container">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="logout-button"
              onClick={this.onLogout}
            >
              Logout
            </button>
          </li>
        </ul>

        <ul className="mobile-icons-container">
          <li>
            <Link to="/">
              <AiFillHome className="mobile-icon" />
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <BsBriefcaseFill className="mobile-icon" />
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="icon-button"
              onClick={this.onLogout}
            >
              <FiLogOut className="mobile-icon" />
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default withRouter(Header)
