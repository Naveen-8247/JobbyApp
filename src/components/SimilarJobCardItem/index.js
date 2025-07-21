import './index.css' 

const SimilarJobCardItem = props => {
  const {jobDetails} = props 


  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = jobDetails

  return (
    <li className="similar-job-item">
      <div className="similar-job-item-header">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-company-logo"
        />
        <div className="similar-job-title-rating-container">
          <h3 className="similar-job-title">{title}</h3>
          <p className="similar-job-rating">⭐ {rating}</p>
        </div>
      </div>
      <h4 className="similar-job-description-label">Description</h4>
      <p className="similar-job-description-text">{jobDescription}</p>
      <div className="similar-job-location-employment-container">
        <p className="similar-job-location">{location}</p>
        <p className="similar-job-employment-type">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobCardItem
