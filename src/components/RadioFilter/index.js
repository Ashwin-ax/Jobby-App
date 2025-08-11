const RadioFilter = props => {
  const {data, selectedRadioBtn} = props
  const {label, salaryRangeId} = data
  const onClickRadioBtn = () => {
    selectedRadioBtn(salaryRangeId)
  }
  return (
    <li className="filter-list-container">
      <input
        type="radio"
        id={label}
        name="salary"
        className="filter-input"
        onClick={onClickRadioBtn}
      />
      <label htmlFor={label}>{label}</label>
    </li>
  )
}

export default RadioFilter
