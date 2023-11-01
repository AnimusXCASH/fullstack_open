import React from "react"
import { Header } from "./Header"
import { Content } from "./Content"

export const Course = ({course}) => {
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
        <>
            <div>
                <Header course={course.name} />
                <Content parts={course.parts} />
                <h3>Total of {totalExercises} exercises</h3>
            </div>
        </>
    );
}