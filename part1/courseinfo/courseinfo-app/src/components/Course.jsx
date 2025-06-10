const Header = ({ name }) => {
 return <h2>{name}</h2>
  
}

const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
    {parts.map((part => 
    <Part  key={part.id} name={part.name} exercises={part.exercises} />
    ))}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) =>{
    console.log('sum so far', sum)
    console.log('current part', part)

    return sum + part.exercises

  },0)
    return `total of ${total} exercises`
    
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course