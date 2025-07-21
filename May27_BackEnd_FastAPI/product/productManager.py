from datetime import datetime
from math import ceil
from os import remove
from fastapi.responses import FileResponse, JSONResponse
from ljw.ljwDBManager import ljwDBManager


class ProductManager:
    def __init__(self):
        self.imageFolder = "./product/image/"
        self.productPerPage = 3
        self.setAllProductCount()

    def setAllProductCount(self):
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "select count(*) from may27_product"
            cur.execute(sql)
            for c in cur:
                self.allProductCount = c[0]
        except Exception as e:
            pass
        finally:
            ljwDBManager.closeConCur(con, cur)

    def delete(self, name, image):
        try:
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            sql = "delete from may27_product where p_name = '%s'" % name
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                remove(self.imageFolder + image)
                return {"result": 1}
            return {"result": 0}
        except Exception as e:
            print(e)
            return {"result": 0}
        finally:
            ljwDBManager.closeConCur(con, cur)

    def getAll(self, page):
        try:
            page = int(page)
            con, cur = ljwDBManager.makeConCur("ljw100/91270290@195.168.9.68:1521/xe")
            allPageCount = ceil(self.allProductCount / self.productPerPage)
            start = (page - 1) * self.productPerPage + 1
            end = page * self.productPerPage
            sql = "select p_name, p_price, p_desc, p_image from "
            sql += "(select rownum as rn, p_name, p_price, p_desc, p_image from "
            sql += "(select * from may27_product order by p_name)) "
            sql += "where rn >= %d and rn <= %d" % (start, end)
            cur.execute(sql)
            products = []
            for name, price, desc, image in cur:
                p = {"name": name, "price": price, "desc": desc, "image": image}
                products.append(p)
            h = {"Access-Control-Allow-Origin": "*"}
            r = {
                "result": "성공",
                "allPageCount": allPageCount,
                "products": products,
            }
            return JSONResponse(r, headers=h)
        except Exception as e:
            print(e)
            return None
        finally:
            ljwDBManager.closeConCur(con, cur)

    def getImage(self, image):
        return FileResponse(self.imageFolder + image, filename=image)

    # 파일 용량 너무 크면 강제 실패
    # 파일 업로드 실패
    # DB 서버 문제로 실패
    async def reg(self, image, name, price, desc):
        h = {
            "Access-Control-Allow-Origin": "*",
        }

        try:
            content = await image.read()
            if len(content) > 30 * 1024 * 1024:
                raise  # 강제로 Exception 발생
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
            # desc = desc.replace("\r\n", "<br>")
            # React에서는 \r\n, <br> 그냥 다 글자로 인식
            # \r\n 그대로 두고 css의 white-space: pre-wrap으로 줄바꿈
            sql = "insert into may27_product values ('%s', %s, '%s', '%s')" % (
                name,
                price,
                desc,
                fileName,
            )
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                return JSONResponse(
                    {
                        "result": "성공",
                        "name": name,
                        "price": price,
                        "desc": desc,
                        "image": fileName,
                    },
                    headers=h,
                )
            return JSONResponse({"result": "등록 실패(DB)"}, headers=h)
        except Exception as e:
            print(e)
            remove(self.imageFolder + fileName) # 이미 업로드되어 있을 파일 삭제
            return JSONResponse({"result": "등록 실패(DB)"}, headers=h)
        finally:
            ljwDBManager.closeConCur(con, cur)
