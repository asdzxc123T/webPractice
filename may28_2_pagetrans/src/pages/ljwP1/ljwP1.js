import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LjwP1 = () => {
    const n = useNavigate(); // 클릭 말고 다른 이벤트로 이동하려면

  return (
    <>
        <div>LjwP1</div>
        <hr />
        <Link to="/p2.go">p2로</Link>
        <hr />
        <Link to="/p4.go/몽쉘/5000">p4로</Link>&nbsp;
        <Link to="/p4.go/마이쮸/500">p4로</Link>
        <hr />
        <Link to="/p5.go?name=홍길동&age=20">p5로</Link>&nbsp;
        <Link to="/p5.go?name=김길동&age=30">p5로</Link>
        <hr />
        <button onDoubleClick={() => {
            n("/p6.go");
            // n(-1); // 뒤로
        }}>p6으로</button>
        <hr />
        
    </>
  )
}

export default LjwP1