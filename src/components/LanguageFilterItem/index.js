import './index.css'

const LanguageFilterItem = props => {
  const {languageData, onToggleLanguageBtn, isActive} = props
  const {id, language} = languageData

  const onClickLanguageBtn = () => {
    onToggleLanguageBtn(id)
  }

  const btnClassname = isActive ? 'select-language-btn' : 'language-btn'

  return (
    <li>
      <button
        type="button"
        className={btnClassname}
        onClick={onClickLanguageBtn}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
