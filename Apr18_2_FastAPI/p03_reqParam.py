from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse


app = FastAPI()

@app.get("/calculate.do")
def calculate_do(xxx:int, yyy:int): # param변수명:자료형
    html = "<html><head><meta charset=\"utf-8\"></head><body>"
    html += "<table border=\"1\">"
    html += "<tr align=\"center\"><td>%d + %d = %d</td></tr>" % (xxx, yyy, xxx + yyy)
    html += "<tr align=\"center\"><td>%d - %d = %d</td></tr>" % (xxx, yyy, xxx - yyy)
    html += "<tr align=\"center\"><td>%d x %d = %d</td></tr>" % (xxx, yyy, xxx * yyy)
    html += "<tr align=\"center\"><td>%d / %d = %d</td></tr>" % (xxx, yyy, xxx / yyy)
    html += "</table>"
    html += "</body></html>"
    return HTMLResponse(html)

# 파일 업로드 때 필요한 건데
#   pip install python-multipart

# http://IP주소:1234/gugudan.show
# start, end는 내부적으로 전달되어 옴
@app.post("/gugudan.show")
def gugudan_show(start:int=Form(), end:int=Form()): # param변수명:자료형=Form()
    html = "<html><head><meta charset=\"utf-8\"></head><body>"
    html += "<table border=\"1\"><tr>"
    for i in range(start, end + 1):
        html += "<th>%d단</th>" % i
    html += "</tr>"
    for j in range(1, 10):
        html += "<tr align=\"center\">"
        for i in range(start, end + 1):
            html += "<td>%d x %d = %d</td>" % (i, j, i * j)
        html += "</tr>"
    html += "</table></body></html>"
    return HTMLResponse(html)