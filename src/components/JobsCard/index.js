import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import {Link} from 'react-router-dom'

import './index.css'

const JobsCard = props => {
  const {data} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnum,
    rating,
    title,
    id,
  } = data
  return (
    <Link to={`/jobs/${id}`}>
      <li className="jobs-card-container">
        <div className="company-logo-name-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="company-name-rating-container">
            <h1 className="company-title">{title}</h1>
            <div className="company-rating-container">
              <FaStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-type-package-container">
          <div className="location-type-container">
            <MdLocationOn className="location-job" />
            <p className="location-job-name">{location}</p>
            <BsBriefcaseFill className="location-job" />
            <p className="location-job-name">{employmentType}</p>
          </div>
          <p>{packagePerAnum}</p>
        </div>
        <hr className="profile-and-filter-partition-line" />
        <h1 className="job-description">Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsCard
