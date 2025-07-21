import React from 'react'
import { useSearchParams } from 'react-router-dom'

const LjwP5 = () => {
    const [student, setStudent] = useSearchParams();
  return (
    <>
        <div>LjwP5</div>
        <div>{student.get("name")} - {student.get("age")}</div>
    </>
  )
}

export default LjwP5