import React from 'react'
import { useParams } from 'react-router-dom'

const LjwP4 = () => {
    const snack = useParams(); // 요청주소
  return (
    <>
        <div>LjwP4</div>
        <div>{snack.name} - {snack.price}</div>
    </>
  )
}

export default LjwP4