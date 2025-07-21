from fastapi import FastAPI, Form, UploadFile
from fastapi.responses import JSONResponse
from menu.menuManager import MenuManager

app = FastAPI()
nm = MenuManager()

@app.get("/menu.reg")
def menuReg(name, price):
    return nm.reg(name, price)

@app.get("/menu.get")
def menuGet(token):
    print(token)
    return nm.get(token)

@app.get("/menu.update")
def menuUpdate(token):
    return nm.update(token)
