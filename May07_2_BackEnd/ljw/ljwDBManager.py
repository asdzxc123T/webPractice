from oracledb import connect


class ljwDBManager:
    def makeConCur(url):
        con = connect(url)
        cur = con.cursor()
        return con, cur
    
    def closeConCur(con, cur):
        cur.close()
        con.close()
        