const Form =({ onSubmit, handleNameChange, handleNumberChange, newName, newNumber }) => {
    return (
        <form onSubmit={onSubmit}>
            <h2>add a new ☎</h2>
            <div>
                <label htmlFor="name">name:</label>
                <input
                    id="name"
                    type='text'
                    value={newName}
                    onChange={handleNameChange}
                    placeholder="e.g. John Doe"
                    required
                />
                <label htmlFor="number">number:</label>
                <input
                    id="number"
                    type='tel'
                    value={newNumber}
                    onChange={handleNumberChange}
                    placeholder="(123) 456-7890"
                    required
                />
            </div>
            <div>
                <button className="add-btn" type="submit">add</button>
            </div>
        </form>
    )
}

export default Form