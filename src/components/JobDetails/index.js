import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SimilarJobs from '../SimilarJobs'

class JobDetails extends Component {
  state = {
    jobDetails: [],
    similarJobs: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const jobDetails = data.job_details
    console.log(jobDetails)
    const similarJobs = data.similar_jobs

    const updatedJobDetails = {
      companyUrl: jobDetails.company_logo_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      desc: jobDetails.job_description,
      packages: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      title: jobDetails.title,
      location: jobDetails.location,
      life: jobDetails.life_at_company,
      skills: jobDetails.skills,
    }

    const updatedSimilarJobs = similarJobs.map(each => ({
      companyUrl: each.company_logo_url,
      webUrl: each.company_website_url,
      employmentType: each.employment_type,
      id: each.id,
      desc: each.job_description,
      rating: each.rating,
      title: each.title,
      location: each.location,
    }))

    this.setState({
      jobDetails: updatedJobDetails,
      similarJobs: updatedSimilarJobs,
      isLoading: false,
    })
  }

  render() {
    const {jobDetails, similarJobs, isLoading} = this.state
    const {
      desc,
      title,
      companyUrl,
      employementType,
      packages,
      rating,
      id,
      location,
      life,
      skills,
      webUrl,
    } = jobDetails

    return !isLoading ? (
      <div>
        <div>
          <img src={companyUrl} alt="website logo" />
          <div>
            <p>{rating}</p>
          </div>
          <div>
            <p>{location}</p>
            <p>{employementType}</p>
            <p>{packages}</p>
            <a href={webUrl}>Visit</a>
          </div>
        </div>
        <h1>Description</h1>
        <div>
          <p>{desc}</p>
          <h1>Skills</h1>
          <ul>
            {skills.map(each => (
              <li>
                <img src={each.image_url} />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <h1>Similar Jobs</h1>
        <ul>
          {similarJobs.map(each => (
            <SimilarJobs item={each} key={each.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }
}

export default JobDetails
