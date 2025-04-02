import { useState } from 'react'
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
//states
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

//click handlers
  const clickGood = () => setGood(prevGood => prevGood + 1)
  
  const clickNeutral = () => setNeutral(prevNeutral => prevNeutral + 1)

  const clickBad = () => setBad(prevBad => prevBad + 1)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={clickGood}>good</Button>
      <Button onClick={clickNeutral}>neutral</Button>
      <Button onClick={clickBad}>bad</Button>
      <h1>statistics</h1>
      <Statistics
      good={good}
      neutral={neutral}
      bad={bad} 
      />
    </div>
  )
}

export default App