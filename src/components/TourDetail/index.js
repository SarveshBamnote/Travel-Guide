import './index.css'

const TourDetail = props => {
  const {eachDetail} = props
  const {imageUrl, name, description} = eachDetail

  return (
    <li className="list-item">
      <img className="image" src={imageUrl} alt={name} />
      <h1 className="name">{name}</h1>
      <p className="description">{description}</p>
    </li>
  )
}

export default TourDetail
