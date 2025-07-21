from typing import Optional
from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse

# uvicorn 파일명:app --host=0.0.0.0 --port=5678 --reload

# GET vs POST
#   reqParam이 
#       GET : 주소에 실려서(~~~~?변수명=값&변수명=값)
#       POST : 내부적으로

# checkbox(변수 하나인데 값이 여러개)
#   -> GET방식으로 표현 불가 -> POST

# 값 안 썼을 때 기본값
#   변수명:자료형=Form(기본값)

# textarea에서 엔터치면 : \r\n
#   py/html의 textarea에서 쓸거면 : 놔두고
#   html에서 쓸거면 : \r\n -> <br>

app = FastAPI()

@app.post("/member.sign.up")
def memberSignUp(id=Form(), pw=Form(), 
                 gender=Form(), addr=Form(), 
                 hobby:Optional[list[str]]=Form(None), 
                 comment=Form()):
    comment = comment.replace("\r\n", "<br>")
    html = "<html><head><meta charset=\"utf-8\"></head><body>"
    html += "<h1>id : %s</h1>" % id
    html += "<h1>pw : %s</h1>" % pw
    html += "<h1>성별 : %s</h1>" % gender
    html += "<h1>주소 : %s</h1>" % addr
    if hobby != None:
        html += "<h1>취미 : %s" % hobby[0]
        for i in range(1, len(hobby)):
            html += ", %s" % hobby[i]
        html += "</h1>"
    html += "<h1>자기소개 : </h1>"
    html += "<h1>%s</h1>" % comment
    html += "</body></html>"
    return HTMLResponse(html)