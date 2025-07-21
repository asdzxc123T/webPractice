import React, { useReducer } from "react";

// setter 역할 할 함수(첫번째p가 기존 state값, 두번째p가 setter로 보내준 값)
// 최종적으로 바뀔 state를 리턴
const doFlagGame = (curState, payload) => {
    return curState + "-" + payload.what + " " + payload.do;
};

// useReducer : 멤버변수 + 멤버변수값 바꿀 수 있는 메소드(setter)
//          + setter에 변화(단순히 바꾸기만 하는 거 이상의)
//          + 정리효과
const LjwHookSecond = () => {
    // const [멤버변수, setter] = useReducer(함수, 기본값);
    // const [state, dispatch] = useReducer(first, second, third);
    // setter(setHistory)를 호출하면 뒤에 써놓은 함수(doFlagGame)가 실행
    const [history, setHistory] = useReducer(doFlagGame, "시작");
    return (
        <>
            <h1>{history}</h1>
            <button
                onClick={() => {
                    setHistory({ what: "청기", do: "올려" });
                }}
            >
                청기올려
            </button>
            <button
                onClick={() => {
                    setHistory({ what: "청기", do: "내려" });
                }}
            >
                청기내려
            </button>
            <button
                onClick={() => {
                    setHistory({ what: "백기", do: "올려" });
                }}
            >
                백기올려
            </button>
            <button
                onClick={() => {
                    setHistory({ what: "백기", do: "내려" });
                }}
            >
                백기내려
            </button>
        </>
    );
};

export default LjwHookSecond;
