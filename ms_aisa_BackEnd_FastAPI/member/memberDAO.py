from datetime import datetime, timedelta, timezone
from os import remove
from fastapi.responses import FileResponse, JSONResponse
from ljw.ljwDBManager import ljwDBManager
import jwt


class MemberDAO:
    def __init__(self):
        self.imageFolder = "./member/image/"
        self.jwtkey = "abcd"
        self.jwtAlgorithm = "HS256"

    def changeInfo(self, id, prevPassword, password, bYear, bMonth, bDay):
        h = {"Access-Control-Allow-Origin": "*"}
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = (
                "update may29_user set u_password = '%s', u_birth = to_date('%s%s%s', 'YYYYMMDD') where u_id = '%s' and u_password = '%s'"
                % (password, bYear, bMonth, bDay, id, prevPassword)
            )
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                return JSONResponse({"result": "성공"}, headers=h)
            return JSONResponse({"result": "비밀번호가 일치하지 않아 실패"}, headers=h)
        except Exception as e:
            print(e)
            return JSONResponse({"result": "실패"}, headers=h)
        finally:
            ljwDBManager.closeConCur(con, cur)

    def checkId(self, id):
        h = {"Access-Control-Allow-Origin": "*"}
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "select count(*) from may29_user where u_id = '%s'" % id
            cur.execute(sql)
            for c in cur:
                return JSONResponse({"result": "성공", "c": c[0]}, headers=h)
        except Exception as e:
            print(e)
            return JSONResponse({"result": "실패"}, headers=h)
        finally:
            ljwDBManager.closeConCur(con, cur)

    def getImage(self, image):
        if image == "null" or image == "":
            return FileResponse(
                self.imageFolder + "default_profile.jpg", filename="default_profile.jpg"
            )
        else:
            return FileResponse(self.imageFolder + image, filename=image)

    def getInfo(self, token):
        h = {"Access-Control-Allow-Origin": "*"}
        try:
            r = jwt.decode(token, self.jwtkey, self.jwtAlgorithm)
            id = r["id"]
            try:
                con, cur = ljwDBManager.makeConCur(
                    "ljw100/91270290@195.168.9.68:1521/xe"
                )
                sql = (
                    "select u_password, u_birth from may29_user where u_id = '%s'" % id
                )
                cur.execute(sql)
                for pw, birth in cur:
                    t_birth = datetime.strftime(birth, "%Y%m%d")
                    r = {
                        "result": "성공",
                        "bYear": t_birth[0:4],
                        "bMonth": t_birth[4:6],
                        "bDay": t_birth[6:8],
                    }
            except:
                r = {"result": "실패"}
            finally:
                ljwDBManager.closeConCur(con, cur)
        except jwt.ExpiredSignatureError:
            r = {"result": "만료됨"}
        except jwt.exceptions.DecodeError:
            r = {"result": "만든 적 없음"}

        return JSONResponse(r, headers=h)

    def getToken(self, token):
        h = {"Access-Control-Allow-Origin": "*"}
        try:
            r = jwt.decode(token, self.jwtkey, self.jwtAlgorithm)
            r = {"result": "성공", "id": r["id"], "image": r["image"]}
        except jwt.ExpiredSignatureError:
            r = {"result": "만료됨"}
        except jwt.exceptions.DecodeError:
            r = {"result": "만든 적 없음"}
        return JSONResponse(r, headers=h)

    def leave(self, token):
        h = {"Access-Control-Allow-Origin": "*"}
        try:
            r = jwt.decode(token, self.jwtkey, self.jwtAlgorithm)
            id = r["id"]
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "delete from may29_user where u_id = '%s'" % id
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                return JSONResponse(
                    {"result": "성공"},
                    headers=h,
                )
            return JSONResponse({"result": "실패"}, headers=h)
        except Exception as e:
            print(e)
            return JSONResponse({"result": "실패"}, headers=h)
        finally:
            ljwDBManager.closeConCur(con, cur)

    def logIn(self, id, password):
        h = {"Access-Control-Allow-Origin": "*"}
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = (
                "select u_id, u_password, u_image from may29_user where u_id = '%s'"
                % id
            )
            cur.execute(sql)
            count = 0
            for id, pw, image in cur:
                count += 1
                if password == pw:
                    r = {
                        "id": id,
                        "image": image,
                        "exp": datetime.now(timezone.utc) + timedelta(seconds=10),
                    }
                    jwtr = jwt.encode(r, self.jwtkey, self.jwtAlgorithm)
                    return JSONResponse(
                        {"result": "성공", "memberJWT": jwtr}, headers=h
                    )
                else:
                    return JSONResponse({"result": "비밀번호 불일치"}, headers=h)
            if count == 0:
                return JSONResponse({"result": "ID 없음"}, headers=h)
            raise
        except Exception as e:
            print(e)
            return JSONResponse({"result": "로그인 실패(DB 오류)"}, headers=h)
        finally:
            ljwDBManager.closeConCur(con, cur)

    def updateToken(self, token):
        h = {"Access-Control-Allow-Origin": "*"}
        try:
            r = jwt.decode(token, self.jwtkey, self.jwtAlgorithm)
            r = {
                "result": "성공",
                "id": r["id"],
                "image": r["image"],
                "exp": datetime.now(timezone.utc) + timedelta(seconds=10),
            }
            jwtr = jwt.encode(r, self.jwtkey, self.jwtAlgorithm)
            r = {"result": "성공", "memberJWT": jwtr}
        except jwt.ExpiredSignatureError:
            r = {"result": "만료됨"}
        except jwt.exceptions.DecodeError:
            r = {"result": "만든 적 없음"}
        return JSONResponse(r, headers=h)

    async def regImage(self, image, id):
        h = {
            "Access-Control-Allow-Origin": "*",
        }

        try:
            content = await image.read()
            if len(content) > 30 * 1024 * 1024:
                raise
            now = datetime.today()
            now = datetime.strftime(now, "%Y%m%d%H%M%S")
            fileName = image.filename
            type = fileName[-4:]
            fileName = fileName.replace(type, "")
            fileName += "_" + now + type

            f = open(self.imageFolder + fileName, "wb")
            f.write(content)
            f.close()
        except:
            return JSONResponse({"result": "등록 실패(파일)"}, headers=h)

        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "select u_image from may29_user where u_id = '%s'" % id
            cur.execute(sql)
            for prevFileName in cur:
                if prevFileName[0] != None:
                    remove(self.imageFolder + prevFileName[0])

            sql = "update may29_user set u_image = '%s' where u_id = '%s'" % (
                fileName,
                id,
            )
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                return JSONResponse(
                    {
                        "result": "성공",
                        "id": id,
                        "image": fileName,
                    },
                    headers=h,
                )
            return JSONResponse({"result": "등록 실패(DB)"}, headers=h)
        except Exception as e:
            print(e)
            remove(self.imageFolder + fileName)  # 이미 업로드되어 있을 파일 삭제
            return JSONResponse({"result": "등록 실패(DB)"}, headers=h)
        finally:
            ljwDBManager.closeConCur(con, cur)

    def regMember(self, id, password, bYear, bMonth, bDay):
        h = {"Access-Control-Allow-Origin": "*"}
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = (
                "insert into may29_user values ('%s', '%s', to_date('%s%s%s', 'YYYYMMDD'), null)"
                % (id, password, bYear, bMonth, bDay)
            )
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                return JSONResponse(
                    {"result": "성공"},
                    headers=h,
                )
            return JSONResponse({"result": "실패"}, headers=h)
        except Exception as e:
            print(e)
            return JSONResponse({"result": "실패"}, headers=h)
        finally:
            ljwDBManager.closeConCur(con, cur)
