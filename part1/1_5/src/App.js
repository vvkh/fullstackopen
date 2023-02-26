const Header = (props) => (
    <h1>{props.course.name}</h1>
)

const Part = (props) => (
    <p>
        {props.part.title} {props.part.exercises}
    </p>
)

const Content = (props) => (
    <div>
        {
            props.parts.map(
                (part) => (
                    <Part key={part.title} part={part}/>
                )
            )
        }
    </div>
)

const Total = (props) => {
    const total = props.parts.reduce((acc, {exercises}) => acc + exercises, 0)
    return (<p>
        Number of exercises {total}
    </p>)
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {title: 'Fundamentals of React', exercises: 10},
            {title: 'Using props to pass data', exercises: 7},
            {title: 'State of a component', exercises: 14}
        ]
    }
    return (
        <div>
            <Header course={course}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default App
