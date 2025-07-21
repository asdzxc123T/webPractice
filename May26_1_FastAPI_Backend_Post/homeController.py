from fastapi import FastAPI, Form, UploadFile
from fastapi.responses import JSONResponse
from photoManager.photoManager import PhotoManager
from calculator.calculator import Calculator

app = FastAPI()
pm = PhotoManager()

@app.get("/calculate.do")
def calc(x, y):
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(Calculator.calculate(x, y), headers=resHeader)

@app.post("/calculate.do.post")
def calcPost(x:int=Form(), y:int=Form()):
    resHeader = {
        "Access-Control-Allow-Origin" : "http://localhost:3000",
        "Access-Control-Allow-Credentials" : "true",
    }
    return JSONResponse(Calculator.calculate(x, y), headers=resHeader)

@app.post("/photo.upload")
async def photoUpload(photo:UploadFile, title:str=Form()):
    r = await pm.upload(photo, title)
    h = {
        "Access-Control-Allow-Origin" : "http://localhost:3000",
        "Access-Control-Allow-Credentials" : "true",
    }
    return JSONResponse(r, headers=h)

@app.get("/photo.get")
async def photoGet(photo):
    return pm.getFile(photo)