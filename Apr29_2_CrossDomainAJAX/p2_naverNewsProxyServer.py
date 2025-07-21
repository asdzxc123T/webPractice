from fastapi import FastAPI, Response
from p2_naverNewsDAO import NaverNewsDAO


app = FastAPI()
nnDAO = NaverNewsDAO()

@app.get("/naver.news.get")
def naverNewsGet(q):
    rb = nnDAO.getNews(q)
    h = {"Access-Control-Allow-Origin" : "*"}
    return Response(rb, media_type="application/xml", headers=h)