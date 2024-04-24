import {Component} from 'react'
import Cookies from 'js-cookie'
import UserProfile from '../UserProfile'
import JobCard from '../JobCard'

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
    jobsList: [],
    salaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {salaryRange, searchInput} = this.state
    console.log(salaryRange)
    const apiUrl = `https://apis.ccbp.in/jobs?&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const {jobs} = data
    const updatedJobs = jobs.map(each => ({
      companyUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      desc: each.job_description,
      packages: each.package_per_annum,
      rating: each.rating,
      title: each.title,
      location: each.location,
    }))
    this.setState({
      jobsList: updatedJobs,
    })
  }

  onChangeSalary = event => {
    this.setState(
      {
        salaryRange: event.target.value,
      },
      this.getJobs,
    )
  }

  render() {
    const {jobsList} = this.state
    return (
      <div>
        <div>
          <UserProfile />
          <h1>Type of Employment</h1>
          <ul>
            <li>
              <label htmlFor="FULLTIME">Full TIme</label>
              <input type="checkbox" id="FULLTIME" />
            </li>
            <li>
              <label htmlFor="PARTTIME">Part Time</label>
              <input type="checkbox" id="PARTTIME" />
            </li>
            <li>
              <label htmlFor="FREELANCE">Freelance</label>
              <input type="checkbox" id="FREELANCE" />
            </li>
            <li>
              <label htmlFor="INTERNSHIP">Full Internship</label>
              <input type="checkbox" id="INTERNSHIP" />
            </li>
          </ul>

          <ul>
            <h1>Salary Range</h1>
            {salaryRangesList.map(each => (
              <li key={each.salaryRangeId}>
                <label htmlFor={each.salaryRangeId}>{each.label}</label>
                <input
                  type="radio"
                  name="range"
                  id={each.salaryRangeId}
                  onChange={this.onChangeSalary}
                  value={each.salaryRangeId}
                />
              </li>
            ))}
          </ul>
        </div>
        <ul>
          {jobsList.map(each => (
            <JobCard key={each.id} item={each} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Jobs
