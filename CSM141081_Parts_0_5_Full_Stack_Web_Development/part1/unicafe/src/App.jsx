import { useState } from 'react'

const Button = ({text, handleClick}) =>{
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};


const Statistics = ({good, neutral, bad}) => {
  const sumFeedback = good + neutral + bad;
  const avgFeedback = sumFeedback !== 0 ? (good - bad) / sumFeedback : 0;
  const positivePercentage = sumFeedback !== 0 ? (good / sumFeedback) * 100 : 0;

  if (sumFeedback === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={sumFeedback} />
          <StatisticLine text="average" value={avgFeedback.toFixed(2)} />
          <StatisticLine text="positive" value={`${positivePercentage.toFixed(2)} %`} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Functions to handle button clicks
  const increaseGood = () => setGood(good + 1);
  const increaseBad = () => setBad(bad + 1);
  const increaseNeutral = () => setNeutral(neutral + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={increaseGood}/>
      <Button text="neutral" handleClick={increaseNeutral}/>
      <Button text="bad" handleClick={increaseBad}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App