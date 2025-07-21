import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'
import {BsBoxArrowUpRight} from 'react-icons/bs'

import Header from '../Header'
import SimilarJobCardItem from '../SimilarJobCardItem'
import './index.css'

const apiStatusConstants = {
  INITIAL: 'INITIAL',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobDetails: null,
    similarJobs: [],
    apiStatus: apiStatusConstants.INITIAL,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.IN_PROGRESS})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const job = data.job_details
      const updatedJobDetails = {
        id: job.id,
        title: job.title,
        rating: job.rating,
        location: job.location,
        companyLogoUrl: job.company_logo_url,
        jobDescription: job.job_description,
        employmentType: job.employment_type,
        packagePerAnnum: job.package_per_annum,
        companyWebsiteUrl: job.company_website_url,
        skills: job.skills.map(skill => ({
          name: skill.name,
          imageUrl: skill.image_url,
        })),
        lifeAtCompany: {
          description: job.life_at_company.description,
          imageUrl: job.life_at_company.image_url,
        },
      }

      const updatedSimilarJobs = data.similar_jobs.map(jobe => ({
        id: jobe.id,
        title: jobe.title,
        rating: jobe.rating,
        location: jobe.location,
        employmentType: jobe.employment_type,
        jobDescription: jobe.job_description,
        companyLogoUrl: jobe.company_logo_url,
      }))

      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstants.SUCCESS,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.FAILURE})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails, similarJobs} = this.state

    return (
      <div className="job-details-container">
        <div className="job-main">
          <div className="job-item-header">
            <img
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />

            <div className="job-title-rating-container">
              <h1 className="job-title">{jobDetails.title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="job-rating">{jobDetails.rating}</p>
              </div>
            </div>
          </div>

          <div className="job-location-employment-package-container">
            <div className="icon-text-pair">
              <MdLocationOn className="job-icon" />
              <p className="job-location">{jobDetails.location}</p>
            </div>
            <div className="icon-text-pair">
              <MdBusinessCenter className="job-icon" />
              <p className="job-employment-type">{jobDetails.employmentType}</p>
            </div>
            <p className="job-package">{jobDetails.packagePerAnnum}</p>
          </div>

          <hr className="job-details-hr" />

          <div className="description-header-container">
            <h2 className="description-heading">Description</h2>
            <a
              href={jobDetails.companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="company-website-link"
            >
              Visit <BsBoxArrowUpRight className="visit-icon" />
            </a>
          </div>
          <p className="job-description-text">{jobDetails.jobDescription}</p>

          <h2 className="skills-heading">Skills</h2>
          <ul className="skills-list">
            {jobDetails.skills.map(skill => (
              <li key={skill.name} className="skill-item">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="skill-image"
                />
                <p className="skill-name">{skill.name}</p>
              </li>
            ))}
          </ul>

          <h2 className="life-at-company-heading">Life at Company</h2>
          <div className="life-at-company-content">
            <p className="life-at-company-description">
              {jobDetails.lifeAtCompany.description}
            </p>
            <img
              src={jobDetails.lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>

        <div className="similar-jobs-section">
          <h2 className="similar-jobs-heading">Similar Jobs</h2>
          <ul className="similar-jobs-list">
            {similarJobs.map(job => (
              <SimilarJobCardItem key={job.id} jobDetails={job} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    return (
      <div>
        <Header />
        {apiStatus === apiStatusConstants.IN_PROGRESS && this.renderLoader()}
        {apiStatus === apiStatusConstants.SUCCESS && this.renderJobDetails()}
        {apiStatus === apiStatusConstants.FAILURE && this.renderFailureView()}
      </div>
    )
  }
}

export default JobDetails
