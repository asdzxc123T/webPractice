from http.client import HTTPSConnection
from urllib.parse import quote

class NaverNewsDAO:
    def getNews(self, searchTxt):
        q = quote(searchTxt)
        h = {"X-Naver-Client-Id":"Jxg2IcNrXA_1Bg2yfRiK",
            "X-Naver-Client-Secret":"TuOhPcVrRM"}
        hc = HTTPSConnection("openapi.naver.com")
        hc.request("GET", "/v1/search/news.xml?query=" + q, headers = h)
        resBody = hc.getresponse().read()
        hc.close()
        # print(resBody)
        return resBody