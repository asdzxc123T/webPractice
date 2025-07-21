# selenium
#   Python HTML 파싱 라이브러리
#   웹브라우저 매크로 라이브러리
#   pip install selenium

from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://news.naver.com")

news = driver.find_elements(By.CSS_SELECTOR, ".cnf_news")
for n in news:
    print(n.text)
