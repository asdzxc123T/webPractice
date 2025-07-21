# flask : 자체 WAS기능 포함 -> 단독실행
#       딱히 가리지 않음
# fastapi : 따로 WAS가 필요
#       기본적으로 json으로 응답
# pip install fastapi
# pip install uvicorn[standard]

# uvicorn p01_basic:app --host=0.0.0.0 --port=5678 --reload
from fastapi import FastAPI

app = FastAPI()

# back-end에서 html/css를 완성시켜서 응답
# back-end에서 데이터만 + html/css는 따로 존재

@app.get("/te.st")
def test():
    d = {"name":"마이쮸", "price":500}
    return d