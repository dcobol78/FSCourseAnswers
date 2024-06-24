import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const title = "give feedback";
  const second_title = "statistics";
  const good_title = "good";
  const neutral_title = "neutral";
  const bad_title = "bad";
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const infoArr = [good, neutral, bad];
  const totalFeedback = good + bad + neutral;
  const setToGood = () => {
    setGood(good + 1);
  };

  const setToNeutral = () => {
    setNeutral(neutral + 1);
  };

  const setToBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Title title={title} />
      <Button handleClick={setToGood} text={good_title} />
      <Button handleClick={setToNeutral} text={neutral_title} />
      <Button handleClick={setToBad} text={bad_title} />
      <SecondTitle second_title={second_title} />
      <Statistics
        info={infoArr}
        good={good}
        bad={bad}
        totalFeedback={totalFeedback}
      />
    </div>
  );
};

const Positive = ({ good, all }) => {
  return (
    <tr>
      <td>positive</td>
      <td> {(good / all) * 100} %</td>
    </tr>
  );
};

const All = ({ all }) => {
  return (
    <tr>
      <td>all</td>
      <td>{all}</td>
    </tr>
  );
};

const Average = ({ all, good, bad }) => {
  return (
    <tr>
      <td>average</td>
      <td>{(good - bad) / all}</td>
    </tr>
  );
};

const Statistics = ({ info, totalFeedback, good, bad }) => {
  if (totalFeedback === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={info[0]} />
          <Statistic text="neutral" value={info[1]} />
          <Statistic text="bad" value={info[2]} />
          <All all={totalFeedback} />
          <Average all={totalFeedback} good={good} bad={bad} />
          <Positive good={good} all={totalFeedback} />
        </tbody>
      </table>
    </div>
  );
};

const Statistic = ({ value, text }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const SecondTitle = ({ second_title }) => {
  return (
    <div>
      <h2>{second_title}</h2>
    </div>
  );
};

const Title = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
