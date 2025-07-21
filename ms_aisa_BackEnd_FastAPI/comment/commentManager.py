from datetime import datetime
from fastapi.responses import JSONResponse
from ljw.ljwDBManager import ljwDBManager


class CommentManager:
    def __init__(self):
        self.imageFolder = "./comment/image"

    def commentDel(self, no):
        try:
            h = {
                "Access-Control-Allow-Origin": "*",
            }
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "delete from may29_comment where c_no = %s" % no
            cur.execute(sql)
            if (cur.rowcount):
                con.commit()
                return JSONResponse({"result": "성공"}, headers=h)
            return JSONResponse({"result": "실패"}, headers=h)
        except Exception as e:
            print(e)
            return JSONResponse({"result": "실패"}, headers=h)
        finally:
            ljwDBManager.closeConCur(con, cur)

    def commentGet(self):
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "SELECT c_no, c_date, c_user_id, c_name, c_comment, u_image "
            sql += "FROM may29_comment LEFT OUTER JOIN (SELECT u_id, u_image FROM may29_user) ON c_user_id = u_id "
            sql += "ORDER BY c_no DESC"
            cur.execute(sql)
            comments = []
            for no, date, id, name, comment, image in cur:
                t_date = datetime.strftime(date, "%Y-%m-%d %H:%M")
                c = {"no": no, "date": t_date, "id": id, "name": name, "comment": comment, "image": image}
                comments.append(c)
            h = {
                "Access-Control-Allow-Origin": "*",
            }
            r = {
                "result": "성공",
                "comments": comments,
            }
            return JSONResponse(r, headers=h)
        except Exception as e:
            print(e)
            return JSONResponse({"result": "실패"}, headers=h)
        finally:
            ljwDBManager.closeConCur(con, cur)

    def commentReg(self, id, name, comment):
        h = {
            "Access-Control-Allow-Origin": "*",
        }
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = (
                "insert into may29_comment values (may29_c_seq.nextval, sysdate, '%s', '%s', '%s')"
                % (id, name, comment)
            )
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                return JSONResponse(
                    {"result": "성공", "name": name, "comment": comment},
                    headers=h,
                )
            return JSONResponse({"result": "실패"}, headers=h)
        except Exception as e:
            print(e)
            return JSONResponse({"result": "실패"}, headers=h)
        finally:
            ljwDBManager.closeConCur(con, cur)