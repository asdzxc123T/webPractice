import React, { useEffect } from 'react'

// React에서 외부js파일 사용 : public/index.html에 넣고
// window.???로 사용

// socket.io 클라이언트 모듈
const LjwSocketClnt = () => {

    useEffect(() => {
      window.io.connect("http://localhost:5678")
    
      return () => {
        
      }
    }, [])
    
    
  return (
    <>

    </>
  )
}

export default LjwSocketClnt