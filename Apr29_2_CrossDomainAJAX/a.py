# 산불로 검색했을 때
# 네이버 뉴스 xml 나오는 거
# 콘솔에 출력

from http.client import HTTPSConnection
from urllib.parse import quote

q = quote("산불")

h = {"X-Naver-Client-Id":"Jxg2IcNrXA_1Bg2yfRiK",
     "X-Naver-Client-Secret":"TuOhPcVrRM"}

hc = HTTPSConnection("openapi.naver.com")
hc.request("GET", "/v1/search/news.xml?query=" + q, headers = h)
resBody = hc.getresponse().read()
hc.close()
print(resBody.decode())