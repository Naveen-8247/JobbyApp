import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

class Profile extends Component {
  state = {
    profileDetails: null,
    apiStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: 'IN_PROGRESS'})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        this.setState({apiStatus: 'FAILURE'})
        return
      }

      const data = await response.json()
      const {profile_image_url: profileImageUrl, short_bio: shortBio} =
        data.profile_details

      this.setState({
        profileDetails: {name, profileImageUrl, shortBio},
        apiStatus: 'SUCCESS',
      })
    } catch (error) {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  renderLoadingView = () => (
    <div
      className='profile-details-card profile-loading-error'
      data-testid='loader'
    >
      <Loader type='ThreeDots' color='#0b69ff' height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className='profile-details-card profile-loading-error'>
      <button
        type='button'
        onClick={this.getProfileDetails}
        className='retry-button'
      >
        Retry
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, shortBio} = profileDetails
    return (
      <div className='profile-details-card'>
        <img src={profileImageUrl} alt='profile' className='profile-image' />
        <h1 className='profile-name'>Dyavar Naveen Kumar</h1>
        <p className='profile-bio'>{shortBio}</p>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return this.renderLoadingView()
      case 'FAILURE':
        return this.renderFailureView()
      case 'SUCCESS':
        return this.renderProfileDetails()
      default:
        return null
    }
  }
}

export default Profile
