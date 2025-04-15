import Person from "./Person"

 const PersonsList = ({ filteredResult, handleRemove }) => {
    return (
        <ul>
            {filteredResult.length > 0 ? 
                filteredResult.map(person =>
                    <Person 
                    key={person.id}
                    id={person.id}
                    name={person.name} 
                    number={person.number}
                    handleRemove={handleRemove}
                    />)
                :
                <em>No matches found</em>}
        </ul>
    )
}

export default PersonsList