from uuid import uuid4
from fastapi import FastAPI, Form, UploadFile
from fastapi.responses import FileResponse, HTMLResponse

app = FastAPI()

# title : 전기신호로 온 거, 알아서 원상복귀(디코딩)시켜서

# 파일 업로드
# 1) 인코딩 방식이 바뀌어서 오니
#   pip install python-multipart
# 2) 파일 저장될 폴더 확보(서버)
#   당장 서버를 쓸 수 없는 상황
#   프로젝트 자체를 서버에 업로드할 거고
#   프로젝트에다 폴더 만들어놓자 + 상대경로

# 동기식
#   요청 보내놓고 서버측의 응답이 올 때까지의 시간
#   동안 멈춤(응답 없음)
# 비동기식 <- fastapi
#   요청 보내놓고 서버측의 응답이 올 때까지의 시간
#   동안 안 멈추고 멀쩡히 사용 가능

# 비동기식으로 놔두면 파일이 다 불러지지도 않았는데 다음 소스 실행
# -> 동기식으로 바꿔야

# 사용자가 ㅋㅋㅋ.png를 업로드했으면
@app.post("/file.up")
async def test(photo:UploadFile, title=Form("ㅋ")):
    if title == "ㅋ":
        pass
    folder = "./imageee/"
    content = await photo.read() # 파일 내용 다 불러오면 진행
    fileName = photo.filename # 사용자가 업로드한 파일명 : ㅋㅋㅋ.png
    type = fileName[-4:] # .png
    fileName = fileName.replace(type, "") # ㅋㅋㅋ
    fileName = fileName + str(uuid4()) + type # ㅋㅋㅋ??.png
    print(fileName, type)

    # uuid : 네트워크상에서 뭐 구별할 때 쓰는

    f = open(folder + fileName, "wb") # b : binary(파일 쓸 때)
    f.write(content)
    f.close()

    html = "<html><head><meta charset=\"utf-8\"></head><body>"
    html += "<h1>제목 : %s</h1>" % title
    html += "<img src=\"file.get?fname=%s\">" % fileName
    html += "<hr>"
    html += "<a href=\"file.get?fname=%s\">%s</a>" % (fileName, title)
    html += "</body></html>"
    return HTMLResponse(html)

# ~~~~/file.get?fname=새asdasd.png
@app.get("/file.get")
async def fileGet(fname):
    folder = "./imageee/"
    return FileResponse(folder + fname, filename=fname)