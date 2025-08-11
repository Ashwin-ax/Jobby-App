const CheckboxFilter = props => {
  const {data, selectEmploymentId} = props
  const {label, employmentTypeId} = data
  const onClickEmployementType = () => {
    selectEmploymentId(employmentTypeId)
  }
  return (
    <li className="filter-list-container">
      <input
        type="checkbox"
        id={label}
        className="filter-input"
        onClick={onClickEmployementType}
      />
      <label htmlFor={label}>{label}</label>
    </li>
  )
}

export default CheckboxFilter
