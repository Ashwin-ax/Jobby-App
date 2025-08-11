import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FiMenu} from 'react-icons/fi'

import './index.css'

class Header extends Component {
  state = {isClicked: false}

  onClickLogoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickWebsiteLogo = () => {
    const {history} = this.props
    history.push('/')
  }

  toggleMenuButton = () => {
    const {isClicked} = this.state
    this.setState({isClicked: !isClicked})
  }

  render() {
    const {isClicked} = this.state
    return (
      <div>
        <nav className="navbar">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="nav-website-logo"
              onClick={this.onClickWebsiteLogo}
            />
          </Link>
          <ul className="header-nav-section-container">
            <li>
              <Link to="/" className="nav-section-item">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="nav-section-item">
                Jobs
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="logout-btn"
                onClick={this.onClickLogoutBtn}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
        <nav className="mobile-navbar">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="mobile-nav-website-logo"
              onClick={this.onClickWebsiteLogo}
            />
          </Link>
          <div className="mobile-nav-right">
            {isClicked && (
              <Link to="/" className="redirect-elements">
                Home
              </Link>
            )}
            {isClicked && (
              <Link to="/jobs" className="redirect-elements">
                Jobs
              </Link>
            )}

            <button
              type="button"
              className="menu-button"
              onClick={this.toggleMenuButton}
            >
              <FiMenu className="hamberger-menu" />
            </button>
          </div>
        </nav>
      </div>
    )
  }
}

export default withRouter(Header)
