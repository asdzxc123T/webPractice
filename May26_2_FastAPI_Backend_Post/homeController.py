from fastapi import FastAPI, Form, UploadFile
from weather.weatherManager import WeatherManager

app = FastAPI()
wm = WeatherManager()

@app.get("/weather.icon.get")
def weatherIconGet(icon):
    return wm.getIcon(icon)

@app.post("/weather.reg")
async def weatherReg(icon:UploadFile, desc:str=Form(), temp:int=Form()):
    return await wm.reg(icon, desc, temp)
