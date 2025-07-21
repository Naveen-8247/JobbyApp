import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import JobCardItem from '../JobCardItem'

const apiStatusConstants = {
  INITIAL: 'INITIAL',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

const LOCATIONS = ['Hyderabad', 'Bangalore', 'Chennai', 'Delhi', 'Mumbai']
const EMPLOYMENT_TYPES = ['FULLTIME', 'PARTTIME', 'FREELANCE', 'INTERNSHIP']
const SALARY_RANGES = [1000000, 2000000, 3000000, 4000000]

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    employmentTypes: [],
    minimumSalary: '',
    selectedLocations: [],
    apiStatus: apiStatusConstants.INITIAL,
  }

  componentDidMount() {
    this.fetchJobs()
  }

  fetchJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.IN_PROGRESS})

    const {searchInput, employmentTypes, minimumSalary, selectedLocations} =
      this.state

    const jwtToken = Cookies.get('jwt_token')
    const employmentParam = employmentTypes.join(',')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentParam}&minimum_package=${minimumSalary}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const filteredJobs = data.jobs.filter(job =>
        selectedLocations.length === 0
          ? true
          : selectedLocations.includes(job.location),
      )

      this.setState({
        jobsList: filteredJobs,
        apiStatus: apiStatusConstants.SUCCESS,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.FAILURE})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.fetchJobs()
  }

  onChangeEmploymentType = event => {
    const {value, checked} = event.target
    this.setState(prevState => {
      if (checked) {
        return {employmentTypes: [...prevState.employmentTypes, value]}
      }
      return {
        employmentTypes: prevState.employmentTypes.filter(
          type => type !== value,
        ),
      }
    }, this.fetchJobs)
  }

  onChangeSalaryRange = event => {
    this.setState({minimumSalary: event.target.value}, this.fetchJobs)
  }

  onChangeLocation = event => {
    const {value, checked} = event.target
    this.setState(prevState => {
      if (checked) {
        return {selectedLocations: [...prevState.selectedLocations, value]}
      }
      return {
        selectedLocations: prevState.selectedLocations.filter(
          loc => loc !== value,
        ),
      }
    }, this.fetchJobs)
  }

  renderNoJobsView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  renderJobsList = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return this.renderNoJobsView()
    }

    return (
      <ul className="jobs-list">
        {jobsList.map(job => (
          <JobCardItem key={job.id} jobDetails={job} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.fetchJobs}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="white" height={50} width={50} />
    </div>
  )

  render() {
    const {
      searchInput,
      employmentTypes,
      minimumSalary,
      selectedLocations,
      apiStatus,
    } = this.state

    let content

    switch (apiStatus) {
      case apiStatusConstants.IN_PROGRESS:
        content = this.renderLoader()
        break
      case apiStatusConstants.SUCCESS:
        content = this.renderJobsList()
        break
      case apiStatusConstants.FAILURE:
        content = this.renderFailureView()
        break
      default:
        content = null
    }

    return (
      <div>
        <Header />
        <div className="jobs-main-container">
          <div className="profile-container sticky-sidebar">
            <Profile />

            <div className="employment-filter-container">
              <h1 className="employment-heading">Type of Employment</h1>
              {EMPLOYMENT_TYPES.map(type => (
                <div className="type-item" key={type}>
                  <input
                    type="checkbox"
                    id={type}
                    value={type}
                    role="checkbox"
                    checked={employmentTypes.includes(type)}
                    onChange={this.onChangeEmploymentType}
                  />
                  <label htmlFor={type}>
                    {type.charAt(0) + type.slice(1).toLowerCase()}
                  </label>
                </div>
              ))}
            </div>

            <div className="salary-checkbox-group">
              <h1>Salary Range</h1>
              {SALARY_RANGES.map(salary => (
                <div className="salary-item" key={salary}>
                  <input
                    type="radio"
                    id={`salary${salary}`}
                    name="salaryRange"
                    value={salary}
                    role="radio"
                    checked={minimumSalary === salary.toString()}
                    onChange={this.onChangeSalaryRange}
                  />
                  <label htmlFor={`salary${salary}`}>
                    {salary / 100000} LPA and Above
                  </label>
                </div>
              ))}
            </div>

            <div className="location-filter-group">
              <h1>Location</h1>
              {LOCATIONS.map(location => (
                <div className="location-item" key={location}>
                  <input
                    type="checkbox"
                    id={location}
                    value={location}
                    role="checkbox"
                    checked={selectedLocations.includes(location)}
                    onChange={this.onChangeLocation}
                  />
                  <label htmlFor={location}>{location}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="jobs-content-container">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search Jobs"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onClickSearch}
              >
                Search
              </button>
            </div>
            {content}

            <div style={{display: 'none'}}>
              <ul></ul>
              <ul></ul>
              <ul></ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
