const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({ parts }) => { // Destructure the props here
  return (
    <div>
      {parts.map(part => (
        <Part key={part.name} part={part.name} exercise={part.exercises}/>
      ))}
    </div>
  ) 
}

const Part = ({part, exercise}) => {
  return (
    <p>
      {part} {exercise}
    </p>
  )
}

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>Number of exercises {totalExercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;
