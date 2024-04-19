import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TourDetail from '../TourDetail'
import './index.css'

class TravelGuide extends Component {
  state = {
    toursList: [],
    apiStatus: 'initial',
  }

  componentDidMount() {
    this.getPackages()
  }

  getPackages = async () => {
    this.setState({apiStatus: 'inProgress'})

    const response = await fetch('https://apis.ccbp.in/tg/packages')
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.packages.map(each => ({
        id: each.id,
        description: each.description,
        imageUrl: each.image_url,
        name: each.name,
      }))

      this.setState({
        toursList: updatedData,
        apiStatus: 'success',
      })
    }
  }

  loaderView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  packagesView = () => {
    const {toursList} = this.state
    console.log(toursList)
    return (
      <ul className="packages-list">
        {toursList.map(each => (
          <TourDetail eachDetail={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderTravelPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'inProgress':
        return this.loaderView()
      case 'success':
        return this.packagesView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="main-heading">Travel Guide</h1>
        {this.renderTravelPage()}
      </div>
    )
  }
}

export default TravelGuide
