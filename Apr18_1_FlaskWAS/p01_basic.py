# Web Server
#   HTML/CSS 올려놓으면
#   사용자가 접속해서 웹사이트 쓸 수 있게 해주는
# WAS(Web Application Server)
#   Web Server + 프로그램 실행 가능

# flask : Python WAS 라이브러리
# 사용자가 요청하면 HTML, CSS를 만들어주는 프로그램

from flask import Flask


app = Flask(__name__)

# HTTP 통신
# 클라이언트가 서버에게 요청
# 서버는 그 요청에 대한 응답

# 요청
#   GET방식 : 주소를 직접 입력, <a>
#   POST방식 : 특별한 상황

# 인터넷 주소 체계
#   프로토콜://IP주소:포트번호/지정한주소?변수명=값&...

@app.get("/te.st") # /te.st라는 주소로 클라이언트로부터 GET 방식 요청 받으면
def test(): # 이 함수 자동 실행
    print("aaa")
    return "abcd" # abcd라고 응답

# 195.168.9.169
# localhost
# 127.0.0.1
# -> 0.0.0.0

# 1 ~ 65536
# well-known port
#   80 : 웹
#   443 : https
# 테스트용은 네자리 이상
if __name__=="__main__":
    app.run(
        "0.0.0.0", # 접속 허용 주소
        1234,      # 포트 번호
        debug=True # 정보 출력
    )