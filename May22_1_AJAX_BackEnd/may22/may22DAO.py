from ljw.ljwDBManager import ljwDBManager

class May22DAO:
    def __init__(self):
        self.pageCount = 5

    def may22Get(self, page):
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            page = int(page)
            sql = "select s_no, s_name, s_price "
            sql += "from ( "
            sql += "SELECT rownum AS rn, s_no, s_name, s_price "
            sql += "from ( "
            sql += "SELECT * FROM may22_snack ORDER BY s_no "
            sql += ") "
            sql += ") where rn >= %d and rn <= %d order by rn" % (self.pageCount * (page - 1) + 1, self.pageCount * page)
            cur.execute(sql)
            result = []
            for no, name, price in cur:
                s = {"no": no, "name" : name, "price" : price}
                result.append(s)
            return result
        except Exception as e:
            print(e)
            return None
        finally:
            ljwDBManager.closeConCur(con, cur)
    
    def may22GetPageCount(self):
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "select count(*) from may22_snack"
            cur.execute(sql)
            for count in cur:
                return {"pageCount": count // self.pageCount + 1}
        except Exception as e:
            print(e)
            return None
        finally:
            ljwDBManager.closeConCur(con, cur)

    def may22Reg(self, name, price):
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "insert into may22_snack values (may22_s_seq.nextval, '%s', %s)" % (name, price)
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                return {"result" : 1}
            return {"result" : 0}
        except Exception as e:
            print(e)
            return {"result" : 0}
        finally:
            ljwDBManager.closeConCur(con, cur)
    
    def may22Delete(self, no):
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "delete from may22_snack where s_no = %s" % no
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                return {"result" : 1}
            return {"result" : 0}
        except Exception as e:
            print(e)
            return {"result" : 0}
        finally:
            ljwDBManager.closeConCur(con, cur)