const Total = ({ parts }) => {
    const sum = parts.reduce((sum, part) => sum + part.exercises, 0)

    return <p><strong>total of {sum} exercises</strong></p>
}

export default Total