from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.get("/html.test")
def html_test():
    html = "<html><head><meta charset=\"utf-8\"></head><body>"
    html += "<marquee>ㅋㅋㅋ</marquee>"
    html += "</body></html>"
    return HTMLResponse(html)