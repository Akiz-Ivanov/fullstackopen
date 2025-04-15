import Part from "./Part"

const Content = ({ parts }) => {

    const renderParts = parts.map(part => {
        const { name, exercises, id } = part

        return (
            <Part
                key={id}
                name={name}
                exercises={exercises}
            />
        )
    })

    return (
        <>
            {renderParts}
        </>
    )
}

export default Content