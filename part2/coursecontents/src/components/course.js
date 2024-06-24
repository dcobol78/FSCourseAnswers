import React from "react";

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <div>
      <p>
        <b>
          total of {parts.reduce((sum, current) => sum + current.exercises, 0)}{" "}
          exercises
        </b>
      </p>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  );
};

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

export default Course;
