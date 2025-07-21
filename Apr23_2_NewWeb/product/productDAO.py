from ljw.ljwDBManager import ljwDBManager


class ProductDAO:
    def getAll(self):
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "select * from apr23_product"
            cur.execute(sql)
            snacks = []
            for name, price in cur:
                s = {"name" : name, "price" : price}
                snacks.append(s)
            return snacks
        except Exception as e:
            print(e)
            return None
        finally:
            ljwDBManager.closeConCur(con, cur)
    
    def reg(self, name, price):
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "insert into apr23_product values ('%s', %s)" % (name, price)
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                return {"result" : name + " 등록 성공"}
            else:
                return {"result" : name + " 등록 실패"}
        except Exception as e:
            print(e)
            return {"result" : "등록 실패"}
        finally:
            ljwDBManager.closeConCur(con, cur)
    
    def delete(self, min, max):
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "delete from apr23_product where p_price > %s and p_price < %s" % (min, max)
            cur.execute(sql)
            if cur.rowcount >= 1:
                con.commit()
                return {"result" : "삭제 성공"}
            else:
                return {"result" : "삭제 실패"}
        except Exception as e:
            print(e)
            return {"result" : "삭제 실패"}
        finally:
            ljwDBManager.closeConCur(con, cur)