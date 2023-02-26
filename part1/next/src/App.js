import {useState} from 'react'

const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const StatisticLine = ({text, value}) => {
    return (
        <p>{text} {value}</p>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad
    const average = (good - bad) / all
    const positive = good / all * 100 + '%'
    if (all === 0) {
        return (<>
            <h2>Statistics</h2>
            <p>No feedback given</p>
        </>)
    }
    return (<>
        <h2>Statistics</h2>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={all}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={positive}/>
    </>)
}
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    return (
        <div>
            <h1>Give feedback</h1>
            <Button onClick={() => setGood(good + 1)} text="good"/>
            <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
            <Button onClick={() => setBad(bad + 1)} text="bad"/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App