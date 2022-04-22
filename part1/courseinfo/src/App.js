const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ name, count }) => {
  return (
    <p>
      {name} {count}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part name={props.part1} count={props.exercises1} />
      <Part name={props.part2} count={props.exercises2} />
      <Part name={props.part3} count={props.exercises3} />
    </div>
  );
};

const Total = ({ total }) => {
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        exercises3={exercises3}
        part3={part3}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
