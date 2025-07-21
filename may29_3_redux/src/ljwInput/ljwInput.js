import React from 'react'
import { useDispatch } from "react-redux";
import { changeTxt } from '../ljwTxtSlice';


const LjwInput = () => {
    const d = useDispatch();
  return (
    <>
        <input onChange={(e) => {
            d(changeTxt(e.target.value));
        }}/>
    </>
  )
}

export default LjwInput