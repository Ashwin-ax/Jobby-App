import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {HiOutlineExternalLink} from 'react-icons/hi'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const activeStateConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDetails: [],
    similarJobs: [],
    activeState: activeStateConstant.initial,
  }

  componentDidMount() {
    this.getDetailedData()
  }

  getDetailedData = async () => {
    this.setState({activeState: activeStateConstant.inProgress})
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
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills,
        title: data.job_details.title,
      }
      const similarJobs = data.similar_jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobDetails,
        similarJobs,
        activeState: activeStateConstant.success,
      })
    } else {
      this.setState({activeState: activeStateConstant.failure})
    }
  }

  onClickJobsDataRetry = () => this.getDetailedData()

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickJobsDataRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" height="50" width="50" color="#ffffff" />
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      companyWebsiteUrl,
      location,
      packagePerAnnum,
      rating,
      skills,
      lifeAtCompany,
      title,
    } = jobDetails
    return (
      <div>
        <div className="job-details-card">
          <div className="company-logo-name-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
            <p>{packagePerAnnum}</p>
          </div>
          <hr className="profile-and-filter-partition-line" />
          <div className="main-visit-description-container">
            <h1 className="job-details-description">Description</h1>
            <a href={companyWebsiteUrl} className="visit-container">
              <p className="visit">Visit</p>
              <HiOutlineExternalLink className="visit-link" />
            </a>
          </div>
          <p>{jobDescription}</p>
          <h1 className="job-details-description">Skills</h1>
          <ul className="skills-container">
            {skills?.map(eachItem => (
              <li className="skill-container" key={eachItem.name}>
                <img
                  src={eachItem.image_url}
                  alt={eachItem.name}
                  className="skill"
                />
                <p>{eachItem.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="job-details-description">Life at Company</h1>

          <div className="life-at-company-container">
            <p>{lifeAtCompany?.description}</p>
            <img
              src={lifeAtCompany?.image_url}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <h1 className="job-details-description">Similar Jobs</h1>
        <ul className="simi-jobs-container">
          {similarJobs.map(eachItem => (
            <SimilarJobs data={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetailsSelection = () => {
    const {activeState} = this.state
    switch (activeState) {
      case activeStateConstant.inProgress:
        return this.renderLoader()
      case activeStateConstant.success:
        return this.renderJobDetails()
      case activeStateConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="job-details-container">
          {this.renderJobDetailsSelection()}
        </div>
      </div>
    )
  }
}

export default JobDetails
