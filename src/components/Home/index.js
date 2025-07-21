import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="home-content">
          <div className="text-section">
            <h1 className="home-heading">Find The Job That Fits Your Life</h1>
            <p className="home-description">
              Millions of people are searching for jobs, salary information, and
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <Link to="/jobs">
              <button type="button" className="find-button">
                Find Jobs
              </button>
            </Link>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png"
            alt="home"
            className="home-image"
          />
        </div>
      </div>
    )
  }
}

export default Home
