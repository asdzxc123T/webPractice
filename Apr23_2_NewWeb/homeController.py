from fastapi import FastAPI
from fastapi.responses import JSONResponse
from product.productDAO import ProductDAO

app = FastAPI()
pDAO = ProductDAO()

@app.get("/product.get")
def productGet():
    resBody = pDAO.getAll()
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)

@app.get("/product.reg")
def productReg(name, price):
    resBody = pDAO.reg(name, price)
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)

@app.get("/product.del")
def productDel(min, max):
    resBody = pDAO.delete(min, max)
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)