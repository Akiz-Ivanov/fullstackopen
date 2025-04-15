const Person = ({ name, number, id, handleRemove }) => {
    return (
        <li className="person">
            <button className="delete-btn" onClick={() => {
                if (window.confirm(`Delete ${name} ?`)) {
                    handleRemove(id)
                }
            }
            }>[<span>delete</span>]</button>
            <span className="name-number">{name} {number} </span>
        </li>
    )
}

export default Person