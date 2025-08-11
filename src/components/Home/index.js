import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <div>
    <Header />
    <div className="home-bg-container">
      <div className="home-page-main-container">
        <h1 className="home-page-main-heading">
          Find The Job That Fits Your Life
        </h1>
        <p className="home-page-main-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="home-page-find-jobs-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
    <diV className="mobile-home-container">
      <div className="mobile-home-page-main-container">
        <h1 className="mobile-home-page-main-heading">
          Find The Job That Fits Your Life
        </h1>
        <p className="mobile-home-page-main-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="mobile-home-page-find-jobs-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </diV>
  </div>
)

export default Home
