from http.client import HTTPSConnection

from bs4 import BeautifulSoup


hc = HTTPSConnection("news.daum.net")
hc.request("GET", "/")
resBody = hc.getresponse().read()
hc.close()

newsData = BeautifulSoup(resBody, "html.parser", from_encoding="utf-8")
tit_txt = newsData.select("article .tit_txt")
for i in tit_txt:
    print(i.text)