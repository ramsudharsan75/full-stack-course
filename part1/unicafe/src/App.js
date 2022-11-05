import { useState } from 'react'

const StatisticLine = ({ text, value }) =>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

const Statistics = ({ good, bad, neutral }) => (<>
  <h1>statistics</h1>
  <table>
    <StatisticLine text='good' value={good} />
    <StatisticLine text='neutral' value={neutral} />
    <StatisticLine text='bad' value={bad} />
    <StatisticLine text='all' value={good + bad + neutral} />
    <StatisticLine text='average' value={(good - bad) / (good + bad + neutral)} />
    <StatisticLine text='positive' value={good / (good + bad + neutral) * 100 + '%'} />
  </table>
</>);

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      {(good + bad + neutral) > 0 ? <Statistics good={good} bad={bad} neutral={neutral} /> : null}
    </div>
  )
}

export default App
