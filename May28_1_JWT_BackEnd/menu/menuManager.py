from datetime import datetime, timedelta, timezone
from fastapi.responses import JSONResponse
import jwt

# 데이터를 Back-End에 저장 : 공용 데이터
# 사용자마다 개별 데이터가 필요할텐데
#       session : 서버 - 사용자의 연결에 저장
#                   연결 끊으면 데이터 삭제
#                   session 유지 시간(조절 가능)동안 가만히 있으면 연결이 끊김
#                                                   요청을 날리면 자동 갱신
#       cookie : 사용자PC에 파일로 저장
#                   연결 끊든 말든, 재부팅을 하든 말든 데이터 남음 -> 보안상 위험
# -> cookie 보안상 위험, session은 서버가 바뀌면 데이터 관리하기가

# JWT(JSON Web Token)
#   JSON + 암호화 + 시간제한
#   자동 갱신 x, 수동 갱신 x -> 똑같은 내용으로 다시 만들기

# pip install pyjwt

# 현재시간날짜 : datetime.today()
# 현재시간날짜 : datetime.now()
# 현재시간날짜(표준시간대) : datetime.now(timezone.utc)
# 현재시간날짜(표준시간대)로부터 10초 지나서 : datetime.now(timezone.utc) + timedelta(seconds=10)


class MenuManager:
    def __init__(self):
        self.jwtkey = "abcd"
        self.jwtAlgorithm = "HS256"

    def get(self, token):
        h = {"Access-Control-Allow-Origin": "*"}
        try:
            r = jwt.decode(token, self.jwtkey, self.jwtAlgorithm)
            r = {"result": "등록했던 게", "name": r["name"], "price": r["price"]}
        except jwt.ExpiredSignatureError:
            r = {"result": "만료됨"}
        except jwt.exceptions.DecodeError:
            r = {"result": "만든 적 없음"}
        return JSONResponse(r, headers=h)

    def reg(self, name, price):
        h = {"Access-Control-Allow-Origin": "*"}
        r = {
            "result": "등록 성공",
            "name": name,
            "price": price,
            "exp": datetime.now(timezone.utc) + timedelta(seconds=10),
        }  # 결과 마음대로(exp 빼고, exp는 만료시간)
        jwtr = jwt.encode(
            r, self.jwtkey, self.jwtAlgorithm
        )  # 내용, 키 알고리즘 / 암호화해서 str 한 덩어리
        return JSONResponse(
            {"menuJWT": jwtr}, headers=h
        )  # JSON형태로 잡아주는 게 좋지 않을까

    def update(self, token):
        h = {"Access-Control-Allow-Origin": "*"}
        try:
            r = jwt.decode(token, self.jwtkey, self.jwtAlgorithm)
            r = {
                "result": "갱신한 게",
                "name": r["name"],
                "price": r["price"],
                "exp": datetime.now(timezone.utc) + timedelta(seconds=10),
            }
            jwtr = jwt.encode(
                r, self.jwtkey, self.jwtAlgorithm
            )
            r = {"menuJWT": jwtr}
        except jwt.ExpiredSignatureError:
            r = {"result": "만료됨"}
        except jwt.exceptions.DecodeError:
            r = {"result": "만든 적 없음"}
        return JSONResponse(r, headers=h)
