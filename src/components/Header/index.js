import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav>
      <div>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/jobs">Job</Link>
      </div>

      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
