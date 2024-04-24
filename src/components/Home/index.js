import {Link} from 'react-router-dom'

import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div>
      <h1>Find The Job That Fits Your Life</h1>
      <p>Millions of peopls</p>
      <Link to="/jobs">
        <button>Find Jobs</button>
      </Link>
    </div>
  </>
)

export default Home
