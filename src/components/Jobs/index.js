import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobsCard from '../JobsCard'
import RadioFilter from '../RadioFilter'
import CheckboxFilter from '../CheckboxFilter'

import './index.css'

const activeStateConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileDetails: '',
    jobsData: [],
    employmentType: [],
    activeState: activeStateConstant.initial,
    activeState2: activeStateConstant.initial,
    minPackage: '',
    inputValue: '',
    search: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsData()
  }

  getProfileDetails = async () => {
    this.setState({activeState2: activeStateConstant.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      console.log(profileDetails)
      this.setState({profileDetails, activeState2: activeStateConstant.success})
    } else {
      this.setState({activeState2: activeStateConstant.failure})
    }
  }

  getJobsData = async () => {
    this.setState({activeState: activeStateConstant.inProgress})
    const {minPackage, employmentType, search} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${minPackage}&search=${search}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnum: eachItem.package_per_annum,
        title: eachItem.title,
        rating: eachItem.rating,
      }))
      this.setState({
        jobsData: updatedData,
        activeState: activeStateConstant.success,
      })
    } else {
      this.setState({activeState: activeStateConstant.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({inputValue: event.target.value})
  }

  onClickSearchBtn = () => {
    const {inputValue} = this.state
    this.setState({search: inputValue}, this.getJobsData)
  }

  selectedRadioBtn = id => {
    this.setState({minPackage: id}, this.getJobsData)
  }

  selectEmploymentId = id => {
    const {employmentType} = this.state
    if (employmentType.includes(id)) {
      const filterEmploymentType = employmentType.filter(
        eachItem => eachItem !== id,
      )
      this.setState({employmentType: filterEmploymentType}, this.getJobsData)
    } else {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, id],
        }),
        this.getJobsData,
      )
    }
  }

  onClickProfileRetry = () => {
    this.getProfileDetails()
  }

  onClickJobsDataRetry = () => {
    this.getJobsData()
  }

  renderProfileLoader = () => (
    <div data-testid="loader" className="profile-loader">
      <Loader type="ThreeDots" height="50" width="50" color="#ffffff" />
    </div>
  )

  renderProfileCardContainer = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <div className="profile-card-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="retry-btn-container">
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickProfileRetry}
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

  renderJobsList = () => {
    const {jobsData} = this.state
    if (jobsData.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }
    return (
      <ul className="jobs-container">
        {jobsData.map(eachItem => (
          <JobsCard data={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

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

  renderProfileCardSelection = () => {
    const {activeState2} = this.state
    switch (activeState2) {
      case activeStateConstant.inProgress:
        return this.renderProfileLoader()
      case activeStateConstant.success:
        return this.renderProfileCardContainer()
      case activeStateConstant.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  renderSelectionOutput = () => {
    const {activeState} = this.state
    switch (activeState) {
      case activeStateConstant.inProgress:
        return this.renderLoader()
      case activeStateConstant.success:
        return this.renderJobsList()
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
        <div className="main-jobs-page-container">
          <div className="profile-and-filter-container">
            {this.renderProfileCardSelection()}
            <hr className="profile-and-filter-partition-line" />
            <div className="filter-container">
              <h1 className="filter-heading">Type of Employment</h1>
              <ul className="filter-main-list-container">
                {employmentTypesList.map(eachItem => (
                  <CheckboxFilter
                    data={eachItem}
                    key={eachItem.employmentTypeId}
                    selectEmploymentId={this.selectEmploymentId}
                  />
                ))}
              </ul>
            </div>
            <hr className="profile-and-filter-partition-line" />
            <div className="filter-container">
              <h1 className="filter-heading">Salary Range</h1>
              <ul className="filter-main-list-container">
                {salaryRangesList.map(eachItem => (
                  <RadioFilter
                    data={eachItem}
                    key={eachItem.salaryRangeId}
                    selectedRadioBtn={this.selectedRadioBtn}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-list-container">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-icon-button"
                onClick={this.onClickSearchBtn}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div>{this.renderSelectionOutput()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
