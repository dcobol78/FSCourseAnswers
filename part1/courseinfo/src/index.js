import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.title}</h1>;
};

const Content = (props) => {
  return (
    <div>
      <Part exercise={props.parts[0]} />
      <Part exercise={props.parts[1]} />
      <Part exercise={props.parts[2]} />
    </div>
  );
};

const Part = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.exercise.name} {props.exercise.exercises}
      </p>
    </div>
  );
};

const Total = (props) => {
  let t = 0;
  for (let i = 0; i < props.parts.length; i++) {
    t += props.parts[i].exercises;
  }
  return <p>Number of exercises {t}</p>;
};

ReactDOM.render(<App />, document.getElementById("root"));
