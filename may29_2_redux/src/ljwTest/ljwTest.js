import React, { useState } from 'react'

const LjwTest = () => {
    const [h1CSS, setH1CSS] = useState({ fontSize: 30 })
  return (
    <>
        <button onClick={() => {setH1CSS({fontSize: h1CSS.fontSize + 10})}}>크게</button>
        <button onClick={() => {setH1CSS({fontSize: h1CSS.fontSize - 10})}}>작게</button>
        <h1 style={h1CSS}>ㅋㅋㅋ</h1>
    </>
  )
}

export default LjwTest