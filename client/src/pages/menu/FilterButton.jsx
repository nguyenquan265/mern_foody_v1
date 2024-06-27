const FilterButton = ({ handleClick, text, className }) => {
  return (
    <button onClick={handleClick} className={className}>
      {text}
    </button>
  )
}

export default FilterButton
