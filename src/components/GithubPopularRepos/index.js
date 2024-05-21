import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const repoStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    repositoryDataList: [],
    activeLanguageId: languageFiltersData[0].id,
    apiStatus: repoStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularRepository()
  }

  getPopularRepository = async () => {
    const {activeLanguageId} = this.state

    this.setState({apiStatus: repoStatusConstants.inProgress})

    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    console.log(url)
    const response = await fetch(url)
    console.log(response)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        name: eachRepo.name,
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        issuesCount: eachRepo.issues_count,
        starsCount: eachRepo.stars_count,
      }))
      this.setState({
        repositoryDataList: updatedData,
        apiStatus: repoStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: repoStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderloadingView = () => (
    <div data-testid="loader" className="loading-container">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {repositoryDataList} = this.state
    return (
      <ul className="repository-data-list-container">
        {repositoryDataList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repositoryData={eachRepo} />
        ))}
      </ul>
    )
  }

  onToggleLanguageBtn = id => {
    this.setState({activeLanguageId: id}, this.getPopularRepository)
  }

  renderLanguageFiltersData = () => {
    const {activeLanguageId} = this.state
    return (
      <ul className="language-filters-data-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            languageData={eachLanguage}
            onToggleLanguageBtn={this.onToggleLanguageBtn}
            isActive={eachLanguage.id === activeLanguageId}
          />
        ))}
      </ul>
    )
  }

  renderSwitchStatement = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case repoStatusConstants.success:
        return this.renderSuccessView()
      case repoStatusConstants.failure:
        return this.renderFailureView()
      default:
        return this.renderloadingView()
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="popular-heading">Popular</h1>
        {this.renderLanguageFiltersData()}
        {this.renderSwitchStatement()}
      </div>
    )
  }
}

export default GithubPopularRepos
