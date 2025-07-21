from ljw.ljwDBManager import ljwDBManager
from datetime import datetime
from fastapi.responses import JSONResponse
import jwt

class GalleryDAO:
    def __init__(self):
        pass

    def getAll(self):
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "SELECT g_no, g_title, g_user_id, g_date from may29_gallery order by g_no desc"
            cur.execute(sql)
            threads = []
            for no, title, id, date in cur:
                t_date = datetime.strftime(date, "%Y-%m-%d %H:%M")
                t = {"no": no, "title": title, "id": id, "date": t_date}
                threads.append(t)
            h = {"Access-Control-Allow-Origin": "*"}
            r = {
                "result": "성공",
                "threads": threads,
            }
            return JSONResponse(r, headers=h)
        except Exception as e:
            print(e)
            return JSONResponse({"result": "실패"}, headers=h)
        finally:
            ljwDBManager.closeConCur(con, cur)

    def reg(self, title, id, desc):
        h = {"Access-Control-Allow-Origin": "*"}
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = (
                "insert into may29_gallery values (may29_g_seq.nextval, '%s', '%s', '%s', sysdate)"
                % (title, id, desc)
            )
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                return JSONResponse({"result": "성공"}, headers=h)
            return JSONResponse({"result": "실패"}, headers=h)
        except Exception as e:
            print(e)
            return JSONResponse({"result": "실패"}, headers=h)
        finally:
            ljwDBManager.closeConCur(con, cur)

    def replyDel(self, no):
        h = {"Access-Control-Allow-Origin": "*"}
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = (
                "delete from may29_reply where r_no = %s" % no
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

    def replyReg(self, id, gno, desc):
        h = {"Access-Control-Allow-Origin": "*"}
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = (
                "insert into may29_reply values (may29_r_seq.nextval, '%s', %d, '%s', sysdate)"
                % (id, gno, desc)
            )
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                return JSONResponse({"result": "성공"}, headers=h)
            return JSONResponse({"result": "실패"}, headers=h)
        except Exception as e:
            print(e)
            return JSONResponse({"result": "실패"}, headers=h)
        finally:
            ljwDBManager.closeConCur(con, cur)
    
    def threadDel(self, no):
        h = {"Access-Control-Allow-Origin": "*"}
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = (
                "delete from may29_gallery where g_no = %s" % no
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

    def threadGet(self, no):
        h = {"Access-Control-Allow-Origin": "*"}
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "SELECT g_no, g_title, g_user_id, g_desc, g_date, u_image "
            sql += "FROM (select g_no, g_title, g_user_id, g_desc, g_date from may29_gallery where g_no = %s) " % no
            sql += "JOIN (SELECT u_id, u_image FROM may29_user) ON g_user_id = u_id "
            cur.execute(sql)
            t = {}
            for tno, title, id, desc, date, image in cur:
                t_date = datetime.strftime(date, "%Y-%m-%d %H:%M")
                t = {
                    "no": no,
                    "title": title,
                    "id": id,
                    "desc": desc,
                    "date": t_date,
                    "image": image,
                }

            sql = "select r_no, r_user_id, r_desc, r_date, u_image "
            sql += "from (select r_no, r_user_id, r_desc, r_date from may29_reply where r_g_no = %s) " % no
            sql += "join (select u_id, u_image from may29_user) on r_user_id = u_id "
            sql += "order by r_no"
            cur.execute(sql)
            replies = []
            for rno, id, desc, date, image in cur:
                t_date = datetime.strftime(date, "%Y-%m-%d %H:%M")
                replies.append({"no": rno, "id": id, "desc": desc, "date": t_date, "image": image})
            
            sql = "select count(*) from may29_reply where r_g_no = %s" % no
            cur.execute(sql)
            for c in cur:
                return JSONResponse({"result": "성공", "thread": t, "replies": replies, "count": c[0]}, headers=h)
            return JSONResponse({"result": "실패"}, headers=h)
        except Exception as e:
            print(e)
            return JSONResponse({"result": "실패"}, headers=h)
        finally:
            ljwDBManager.closeConCur(con, cur)