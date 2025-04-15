const Filter = ({ onChange }) => {
    return (
        <section className="filter">
            <label htmlFor='search'>filter shown with </label>
            <input
                id="search"
                type="text"
                onChange={onChange}
                placeholder="Type to filter names..."
            />
        </section>
    )
}

export default Filter