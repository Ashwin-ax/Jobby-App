import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobs = props => {
  const {data} = props
  const {
    companyLogoUrl,
    jobDescription,
    rating,
    title,
    employmentType,
    location,
  } = data
  return (
    <li className="simi-job-container">
      <div className="company-logo-name-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="company-name-rating-container">
          <h1 className="simi-jobs-company-name">{title}</h1>
          <div className="company-rating-container">
            <FaStar className="star-icon" />
            <p className="simi-jobs-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="simi-location-type-container">
        <MdLocationOn className="location-job" />
        <p className="location-job-name">{location}</p>
        <BsBriefcaseFill className="location-job" />
        <p className="location-job-name">{employmentType}</p>
      </div>
      <hr className="profile-and-filter-partition-line" />
      <h1 className="simi-lobs-description-heading">Description</h1>
      <p className="simi-jobs-description">{jobDescription}</p>
    </li>
  )
}

export default SimilarJobs
