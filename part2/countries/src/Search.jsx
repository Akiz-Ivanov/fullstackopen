const Search = ({ handleSearch, value }) => {
    return (
        <div className='search-wrapper'>
            <label htmlFor='search' className="search-label">🌐 Find countries </label>
            <input
                id='search'
                type='text'
                required
                placeholder='Enter the country'
                onChange={handleSearch}
                value={value}
                className="search-input"
            />
        </div>
    )
}

export default Search