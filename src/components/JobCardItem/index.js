import {Link} from 'react-router-dom'
import {FaStar, FaMapMarkerAlt, FaBriefcase} from 'react-icons/fa'
import './index.css'

const JobCardItem = ({jobDetails}) => {
  const {
    id,
    company_logo_url: companyLogoUrl,
    title,
    job_description: jobDescription,
    location,
    employment_type: employmentType,
    package_per_annum: packagePerAnnum,
    rating,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className='job-card-link'>
      <div className='job-card'>
        <div className='job-card-header'>
          <img
            src={companyLogoUrl}
            alt='company logo'
            className='company-logo'
          />
          <div className='job-title-rating'>
            <h2>{title}</h2>
            <div className='rating-container'>
              <FaStar className='star-icon' />
              <p>{rating}</p>
            </div>
          </div>
        </div>

        <div className='job-card-meta'>
          <div className='meta-item'>
            <FaMapMarkerAlt className='icon' />
            <p>{location}</p>
          </div>
          <div className='meta-item'>
            <FaBriefcase className='icon' />
          </div>
          <div className='meta-item package-item'>
            {' '}
            <p>{packagePerAnnum}</p>
          </div>
        </div>

        <div className='job-description-section'>
          {' '}
          <h3>Description</h3>
          <p className='job-description-text'>{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobCardItem
