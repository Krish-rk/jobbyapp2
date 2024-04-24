import {Component} from 'react'
import Cookies from 'js-cookie'

class UserProfile extends Component {
  state = {
    details: '',
  }

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    const api = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)
    if (response.ok) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const updatedData = {
        name: profileDetails.name,
        imageUrl: profileDetails.profile_image_url,
        bio: profileDetails.short_bio,
      }
      this.setState({
        details: updatedData,
      })
    }
  }

  render() {
    const {details} = this.state
    const {name, imageUrl, bio} = details
    return (
      <div>
        <img src={imageUrl} alt={name} />
        <h1>{name}</h1>
        <p>{bio}</p>
      </div>
    )
  }
}

export default UserProfile
