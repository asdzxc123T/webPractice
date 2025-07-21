from fastapi import FastAPI, Form, UploadFile
from fastapi.responses import FileResponse, HTMLResponse

app = FastAPI()

def showbmi(bmi):
    if bmi >= 39:
        return "고도 비만" 
    elif bmi >= 32:
        return "중도 비만"
    elif bmi >= 30:
        return "경도 비만"
    elif bmi >= 24:
        return "과체중"
    elif bmi >= 10:
        return "정상 체중"
    else:
        return "저체중"

@app.post("/bmi.res")
async def fileUpload(psa:UploadFile, id=Form(), height=Form(), weight=Form()):
    folder = "./image/"
    content = await psa.read()
    fileName = psa.filename

    f = open(folder + fileName, "wb")
    f.write(content)
    f.close()

    height = int(height)
    weight = int(weight)
    bmi = weight / ((height / 100) ** 2)
    bmiRes = showbmi(bmi)

    html = "<html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"css.get?cname=%s\"></head><body>" % "c1.css"
    html += "<table border=\"1\">"
    html += "<tr align=\"center\"><td colspan=\"2\">비만도</td></tr>"
    html += "<tr align=\"center\"><td colspan=\"2\"><img src=\"file.get?fname=%s\"></td></tr>" % fileName
    html += "<tr align=\"center\"><td>이름</td><td>%s</td></tr>" % id
    html += "<tr align=\"center\"><td>키</td><td>%.1f</td></tr>" % height
    html += "<tr align=\"center\"><td>몸무게</td><td>%.1f</td></tr>" % weight
    html += "<tr align=\"center\"><td>BMI</td><td>%.1f</td></tr>" % bmi
    html += "<tr align=\"center\"><td colspan=\"2\">%s</td></tr>" % bmiRes
    html += "</table>"
    html += "</body></html>"
    return HTMLResponse(html)

@app.get("/file.get")
async def fileGet(fname):
    folder="./image/"
    return FileResponse(folder + fname, filename=fname)

@app.get("/css.get")
async def cssGet(cname):
    return FileResponse("./" + cname, filename=cname)