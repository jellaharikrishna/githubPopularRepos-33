import './index.css'

const RepositoryItem = props => {
  const {repositoryData} = props
  const {name, avatarUrl, forksCount, issuesCount, starsCount} = repositoryData

  return (
    <li className="repo-list">
      <img className="avatar-icon" src={avatarUrl} alt={name} />
      <h1 className="repo-list-name">{name}</h1>
      <div className="repo-card">
        <img
          className="repo-icon"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="repo-name">{starsCount} stars</p>
      </div>
      <div className="repo-card">
        <img
          className="repo-icon"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="repo-name">{forksCount} forks</p>
      </div>
      <div className="repo-card">
        <img
          className="repo-icon"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="repo-name">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
