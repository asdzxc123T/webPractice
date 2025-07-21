from fastapi import FastAPI
from fastapi.responses import JSONResponse
from may07.may07DAO import May07DAO

app = FastAPI()
mDAO = May07DAO()

@app.get("/may07.reg")
def may07Reg(color, status):
    resBody = mDAO.may07Reg(color, status)
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)

@app.get("/may07.get.count")
def may07GetCount():
    resBody = mDAO.may07GetCount()
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)

@app.get("/may07.get.count.search")
def may07GetCountSearch(searchTxt):
    resBody = mDAO.may07GetCountSearch(searchTxt)
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)

@app.get("/may07.get.all")
def may07GetAll(pageNum):
    resBody = mDAO.may07GetAll(pageNum)
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)

@app.get("/may07.get.search")
def may07GetSearch(pageNum, searchTxt):
    resBody = mDAO.may07GetSearch(pageNum, searchTxt)
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)

@app.get("/may07.get.detail")
def may07GetDetail(n):
    resBody = mDAO.may07GetDetail(n)
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)

@app.get("/may07.update")
def may07Update(updateNo, updateColor, updateStatus):
    resBody = mDAO.may07Update(updateNo, updateColor, updateStatus)
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)

@app.get("/may07.delete")
def may07Delete(deleteNo):
    resBody = mDAO.may07Delete(deleteNo)
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)