# https://www.melon.com/chart/index.htm

# from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome()
driver.get("https://www.melon.com/chart/index.htm")

# body = driver.find_element(By.CSS_SELECTOR, "body")
# for i in range(5):
#     body.send_keys(Keys.END)
#     sleep(1)

# JavaScript : 웹사이트의 이벤트
# driver.execute_script("JavaScript문법")

melonChart = driver.find_elements(By.CSS_SELECTOR, ".rank01 a")
for m in melonChart:
    print(m.text)