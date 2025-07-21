from flask import Flask


app = Flask(__name__)

# http://IP주소:1234/html.test
@app.get("/html.test")
def html_test():
    html = "<html><head><meta charset=\"utf-8\"></head><body>"
    html += "<marquee>ㅋㅋㅋ</marquee>"
    html += "</body></html>"
    return html

# http://IP주소:1234/xy.calculate
@app.get("/xy.calculate")
def xy_calculate():
    a = 10
    b = 20
    c = a + b
    html = "<html><head><meta charset=\"utf-8\"></head><body>"
    html += "<h1>%d</h1>" % c
    html += "</body></html>"
    return html

# http://IP주소:1234/gugudan.show
@app.get("/gugudan.show")
def gugudan_show():
    html = "<html><head><meta charset=\"utf-8\"></head><body>"
    html += "<table border=\"1\"><tr>"
    for i in range(2, 10):
        html += "<th>%d단</th>" % i
    html += "</tr>"
    for j in range(1, 10):
        html += "<tr align=\"center\">"
        for i in range(2, 10):
            html += "<td>%d x %d = %d</td>" % (i, j, i * j)
        html += "</tr>"
    html += "</table></body></html>"
    return html


if __name__=="__main__":
    app.run("0.0.0.0", 1234, debug=True)