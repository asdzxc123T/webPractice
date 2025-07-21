from fastapi import FastAPI
from fastapi.responses import JSONResponse
from may22.may22DAO import May22DAO

app = FastAPI()
mDAO = May22DAO()

@app.get("/may22.get")
def may14Get(page):
    resBody = mDAO.may22Get(page)
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)

@app.get("/may22.get.page.count")
def may14GetPageCount():
    resBody = mDAO.may22GetPageCount()
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)

@app.get("/may22.reg")
def may07Reg(name, price):
    resBody = mDAO.may22Reg(name, price)
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)

@app.get("/may22.delete")
def may07Reg(no):
    resBody = mDAO.may22Delete(no)
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)
