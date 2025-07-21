from flask import Flask, request


app = Flask(__name__)

# http://IP주소:1234/html.test
@app.get("/html.test")
def html_test():
    html = "<html><head><meta charset=\"utf-8\"></head><body>"
    html += "<marquee>ㅋㅋㅋ</marquee>"
    html += "</body></html>"
    return html

# request parameter : 클라이언트가 WAS로 보내는 정보

# 요청
#   GET방식
#       주소를 직접 입력, <a>
#       요청 param이 주소에 실려서 전달
#   POST방식
#       form을 통해서만 가능
#       요청 param이 내부적으로 전달 -> 보안성 높음

# http://IP주소:1234/calculate.do?xxx=10&yyy=5
@app.get("/calculate.do")
def calculate_do():
    x = int(request.args.get("xxx")) # request.args.get("reqParam변수명")
    y = int(request.args.get("yyy"))
    html = "<html><head><meta charset=\"utf-8\"></head><body>"
    html += "<table border=\"1\">"
    html += "<tr align=\"center\"><td>%d + %d = %d</td></tr>" % (x, y, x + y)
    html += "<tr align=\"center\"><td>%d - %d = %d</td></tr>" % (x, y, x - y)
    html += "<tr align=\"center\"><td>%d x %d = %d</td></tr>" % (x, y, x * y)
    html += "<tr align=\"center\"><td>%d / %d = %d</td></tr>" % (x, y, x / y)
    html += "</table>"
    html += "</body></html>"
    return html

# http://IP주소:1234/gugudan.show
# start, end는 내부적으로 전달되어 옴
@app.post("/gugudan.show")
def gugudan_show():
    start = int(request.form["start"])
    end = int(request.form["end"])
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
    return html

if __name__=="__main__":
    app.run("0.0.0.0", 1234, debug=True)