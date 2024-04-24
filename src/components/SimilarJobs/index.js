const SimilarJobs = props => {
  const {item} = props
  const {
    desc,
    title,
    companyUrl,
    employementType,

    rating,
    id,
    location,
    life,
    skills,
  } = item

  return (
    <div>
      <div>
        <img src={companyUrl} />
        <h1>{title}</h1>
        <p>{rating}</p>
      </div>
      <div>
        <h1>Description</h1>
        <p>{desc}</p>
        <p>{location}</p>
        <p>{employementType}</p>
      </div>
    </div>
  )
}

export default SimilarJobs
