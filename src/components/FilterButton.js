
function FilterButton({ mode, setFilter }) {
	return (
		<button
			type="button"
			className="btn btn--filter"
			onClick={() => setFilter(mode)}
		>
			{mode}
		</button>
	)
}

export default FilterButton