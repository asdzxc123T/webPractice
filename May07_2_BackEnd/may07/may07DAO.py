from datetime import datetime
from decimal import ROUND_UP
import math
from ljw.ljwDBManager import ljwDBManager

class May07DAO:
    def __init__(self):
        self.machinePerPage = 10

    def may07Reg(self, color, status):
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "insert into may07 values (may07_m_seq.nextval, '%s', '%s', sysdate)" % (color, status)
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                return {"color" : color, "status" : status}
            return {"result" : "등록 실패"}
        except Exception as e:
            print(e)
            return {"result" : "등록 실패"}
        finally:
            ljwDBManager.closeConCur(con, cur)

    def may07GetCount(self):
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "select count(*) from may07"
            cur.execute(sql)
            for count in cur:
                self.allMachineCount = count[0]
                return {"pageCount" : math.ceil(count[0] / self.machinePerPage)}
        except Exception as e:
            print(e)
            return None
        finally:
            ljwDBManager.closeConCur(con, cur)

    def may07GetCountSearch(self, searchTxt):
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "select count(*) from may07 "
            sql += "where m_color like '%%%s%%'" % searchTxt
            cur.execute(sql)
            for count in cur:
                return {"pageCount" : math.ceil(count[0] / self.machinePerPage)}
        except Exception as e:
            print(e)
            return None
        finally:
            ljwDBManager.closeConCur(con, cur)
    
    def may07GetAll(self, pageNum):
        try:
            pageNum = int(pageNum)
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "select m_no, m_color, m_status, m_date "
            sql += "from "
            sql += "(select rownum as rn, m_no, m_color, m_status, m_date "
            sql += "from "
            sql += "(select * from may07 "
            sql += "order by m_no)) "
            sql += "where rn >= %d and rn <= %d" % ((pageNum - 1) * self.machinePerPage + 1, pageNum * self.machinePerPage)
            cur.execute(sql)
            result = []
            for no, color, status, m_date in cur:
                s = {"no" : no, "color" : color, "status" : status, "date" : datetime.strftime(m_date, "%Y/%m/%d %H:%M")}
                result.append(s)
            return result
        except Exception as e:
            print(e)
            return None
        finally:
            ljwDBManager.closeConCur(con, cur)

    def may07GetSearch(self, pageNum, searchTxt):
        try:
            pageNum = int(pageNum)
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "select m_no, m_color, m_status, m_date "
            sql += "from "
            sql += "(select rownum as rn, m_no, m_color, m_status, m_date "
            sql += "from "
            sql += "(select * from may07 "
            sql += "where m_color like '%%%s%%' " % searchTxt
            sql += "order by m_no)) "
            sql += "where rn >= %d and rn <= %d" % ((pageNum - 1) * self.machinePerPage + 1, pageNum * self.machinePerPage)
            cur.execute(sql)
            result = []
            for no, color, status, m_date in cur:
                s = {"no" : no, "color" : color, "status" : status, "date" : datetime.strftime(m_date, "%Y/%m/%d %H:%M")}
                result.append(s)
            return result
        except Exception as e:
            print(e)
            return None
        finally:
            ljwDBManager.closeConCur(con, cur)

    def may07GetDetail(self, n):
        try:
            n = int(n)
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "select * from may07 "
            sql += "where m_no = %d" % n
            cur.execute(sql)
            for no, color, status, m_date in cur:
                return {"no" : no, "color" : color, "status" : status, "date" : datetime.strftime(m_date, "%Y/%m/%d %H:%M")}
        except Exception as e:
            print(e)
            return None
        finally:
            ljwDBManager.closeConCur(con, cur)

    def may07Update(self, updateNo, updateColor, updateStatus):
        try:
            updateNo = int(updateNo)
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "update may07 set m_color = '%s', m_status = '%s', m_date = sysdate " % (updateColor, updateStatus)
            sql += "where m_no = %d" % updateNo
            cur.execute(sql)
            if (cur.rowcount == 1):
                con.commit()
                return {"result" : "Update Success"}
        except Exception as e:
            print(e)
            return {"result" : "Update Fail"}
        finally:
            ljwDBManager.closeConCur(con, cur)
    
    def may07Delete(self, deleteNo):
        try:
            deleteNo = int(deleteNo)
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "delete from may07 "
            sql += "where m_no = %d" % deleteNo
            cur.execute(sql)
            if (cur.rowcount == 1):
                con.commit()
                return {"result" : "Delete Success"}
        except Exception as e:
            print(e)
            return {"result" : "Delete Fail"}
        finally:
            ljwDBManager.closeConCur(con, cur)