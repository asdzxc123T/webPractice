# BD 분석용 데이터/AI 학습용 데이터
# 는 어디서 구하나
# 1) 발로 뛰어서
# 2) 웹 데이터
#       XML
#       JSON
#       XML/JSON 못 구하면 -> 웹사이트에서 긁어오자
# 3) 만들어져 있는 데이터 구해서
#       kaggle

# Web Crawling(Scraping)
#   좁은 의미 : HTML 파싱
#   넓은 의미 : 어쨌든 웹에서 가져오면(XML/JSON/HTML/...)

# 근데
#   XML : 데이터를 HTML DOM 객체 모양으로 표현해놓은 거
#   JSON : 데이터를 JavaScript 객체 모양으로 표현해놓은 거
#   HTML : 웹사이트 만들 때 쓰는 디자인 언어
#       -> 파싱 난이도가...
#       -> 거기서 데이터를 긁어가? 법적문제

# 멜론 : 데이터는 주고 싶지 않다, 일반 사용자들 차트나 보게 하고 싶었다
# 우리 : 차트를 볼 수 있다 -> 데이터 주겠다는 거 아닌가?

# 1) 정식으로 웹브라우저 켜서 접속은 가능하게,
# 프로그램 만들어서 GET 방식 요청 날리는 건 막아놓은 곳이 많음
# 2) 
#   back-end에서 html을 완성시켜서 제공하는[전통 웹]
#   front-end에서 동적으로 html을 만들어내는[신형 웹]
#       스크롤 시키면 다음 페이지 나오는 사이트
#       에서 스크롤은? -> 스크롤 못 시키니 안 될 것
# -> selenium : 매크로(웹브라우저 켜서 스크롤 시키고, 
# 웹브라우저의 데이터를 받아올 수 있다면)

# https://sd-beanmouse.duckdns.org

# HTTP 통신 걸어서 응답내용 콘솔에
from http.client import HTTPSConnection

from bs4 import BeautifulSoup


hc = HTTPSConnection("sd-beanmouse.duckdns.org")
hc.request("GET", "/")
resBody = hc.getresponse().read()
hc.close()

# Python HTML 파싱 라이브러리
# beautifulsoup, selenium(웹브라우저 매크로 라이브러리)
#   pip install bs4

# 받아온 거, 내장 html 파서 이름, 그 사이트 뭐로 인코딩
cafeData = BeautifulSoup(resBody, "html.parser", from_encoding="utf-8")
# cafeData.select("css선택자")
snsTxts = cafeData.select(".txtTd")
for i in snsTxts:
    print(i.text)