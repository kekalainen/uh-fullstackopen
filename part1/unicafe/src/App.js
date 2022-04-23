import { useState } from 'react';

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button label="good" onClick={() => setGood(good + 1)} />
      <Button label="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button label="bad" onClick={() => setBad(bad + 1)} />
      <h1>Statistics</h1>
      <ul>
        <li>good: {good}</li>
        <li>neutral: {neutral}</li>
        <li>bad: {bad}</li>
      </ul>
    </div>
  );
};

export default App;
