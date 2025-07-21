from fastapi import FastAPI, Form, UploadFile
from fastapi.responses import JSONResponse
from product.productManager import ProductManager

app = FastAPI()
pm = ProductManager()

@app.get("/product.delete")
def productDelete(name, image):
    resBody = pm.delete(name, image)
    resHeader = {"Access-Control-Allow-Origin" : "*"}
    return JSONResponse(resBody, headers=resHeader)

@app.get("/product.get.all")
def productGetAll(page):
    return pm.getAll(page)

@app.get("/product.image.get")
def productImageGet(image):
    return pm.getImage(image)

@app.post("/product.reg")
async def productReg(image:UploadFile, name:str=Form(), price:int=Form(), desc:str=Form()):
    return await pm.reg(image, name, price, desc)
