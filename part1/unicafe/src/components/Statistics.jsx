import StatisticLine from "./StatisticLine"

const Statistics = ({ good, neutral, bad }) => {

    //derived values
    const total = good + neutral + bad
    const average = (good - bad) / total
    const positive = (good / total) * 100

    if (!total) {
        return (
            <p>No feedback given</p>
        )
    }

    return (
        <div>
        <table>
            <tbody>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral} />
                    <StatisticLine text="bad" value={bad} />
                    <StatisticLine text="all" value={total} />
                    <StatisticLine text="average" value={average} />
                    <StatisticLine text="positive" value={`${positive} %`} />
            </tbody>
        </table>
        </div>
    )
}

export default Statistics