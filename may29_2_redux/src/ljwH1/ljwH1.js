import React from 'react'
import { useSelector } from 'react-redux'

// subscriber : state를 구독하는 존재
const LjwH1 = () => {
    // (store객체) => store객체.store쪽에 있는 그 이름(slice쪽 말고)
    const sizeCss = useSelector((st) => st.lss);
  return (
    <h1 style={sizeCss}>ㅋㅋㅋ</h1>
  )
}

export default LjwH1