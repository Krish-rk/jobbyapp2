import {Link} from 'react-router-dom'

const JobCard = props => {
  const {item} = props
  const {
    desc,
    title,
    companyUrl,
    employementType,
    packages,
    rating,
    id,
    location,
  } = item
  return (
    <Link to={`/jobs/${id}`}>
      <li>
        <img src={companyUrl} />
        <div>
          <h1>{title}</h1>
          <p>{rating}</p>
        </div>
        <div>
          <p>{location}</p>
          <p>{employementType}</p>
          <p>{packages}</p>
        </div>
        <div>
          <h1>Description</h1>
          <p>{desc}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
