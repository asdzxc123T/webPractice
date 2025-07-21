from fastapi import FastAPI
from fastapi.responses import JSONResponse
from may14.may14DAO import May14DAO

app = FastAPI()
mDAO = May14DAO()

@app.get("/may14.get.all")
def may14GetAll():
    resBody = mDAO.may14GetAll()
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)

@app.get("/may14.reg")
def may07Reg(name, price):
    resBody = mDAO.may14Reg(name, price)
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)
