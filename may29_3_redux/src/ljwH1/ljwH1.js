import React from 'react'
import { useSelector } from 'react-redux'

const LjwH1 = () => {
    const txt = useSelector((s) => s.lts.txt);
  return (
    <h1>{txt}</h1>
  )
}

export default LjwH1