const Course = ({ course }) => {
    const { name, parts } = course;

    const Header = ({ name }) => <h2>{name}</h2>;
    const Part = ({ part, exercises }) => <p>{part} {exercises}</p>;
    const Total = ({ parts }) => (
        <p>
            <b>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises </b>
        </p>
    );

    const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />);

    return (
        <>
            <Header name={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </>
    );
};

export default Course;