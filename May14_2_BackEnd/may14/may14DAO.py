from ljw.ljwDBManager import ljwDBManager

class May14DAO:
    def may14Reg(self, name, price):
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "insert into may14_snack values ('%s', %s)" % (name, price)
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
    
    def may14GetAll(self):
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "select * from may14_snack"
            cur.execute(sql)
            result = []
            for name, price in cur:
                s = {"name" : name, "price" : price}
                result.append(s)
            return result
        except Exception as e:
            print(e)
            return None
        finally:
            ljwDBManager.closeConCur(con, cur)