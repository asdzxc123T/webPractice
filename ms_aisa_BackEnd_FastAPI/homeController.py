from fastapi import FastAPI, Form, UploadFile
from fastapi.responses import JSONResponse
from comment.commentManager import CommentManager
from member.memberDAO import MemberDAO
from gallery.galleryDAO import GalleryDAO

app = FastAPI()
cm = CommentManager()
mDAO = MemberDAO()
gDAO = GalleryDAO()

@app.get("/comment.del")
def commentDel(no):
    return cm.commentDel(no)

@app.get("/comment.get")
def commentGet():
    return cm.commentGet()

@app.post("/comment.reg")
def commentReg(id:str=Form(), name:str=Form(), comment:str=Form()):
    return cm.commentReg(id, name, comment)

@app.get("/get.token")
def getToken(token):
    return mDAO.getToken(token)

@app.get("/update.token")
def updateToken(token):
    return mDAO.updateToken(token)

@app.get("/image.get")
def imageGet(image):
    return mDAO.getImage(image)

@app.post("/image.reg")
async def imageReg(image:UploadFile, id:str=Form()):
    return await mDAO.regImage(image, id)

@app.post("/log.in")
def logIn(id:str=Form(), password:str=Form()):
    return mDAO.logIn(id, password)

@app.get("/check.id")
def checkId(id):
    return mDAO.checkId(id)

@app.post("/user.reg")
def signUp(id:str=Form(), password:str=Form(), bYear:str=Form(), bMonth:str=Form(), bDay:str=Form()):
    return mDAO.regMember(id, password, bYear, bMonth, bDay)

@app.get("/get.info")
def getInfo(token):
    return mDAO.getInfo(token)

@app.post("/user.info.change")
def infoChange(id:str=Form(), prevPassword:str=Form(), password:str=Form(), bYear:str=Form(), bMonth:str=Form(), bDay:str=Form()):
    return mDAO.changeInfo(id, prevPassword, password, bYear, bMonth, bDay)

@app.get("/user.leave")
def leave(token):
    return mDAO.leave(token)

@app.get("/gallery.get.all")
def galleryGetAll():
    return gDAO.getAll()

@app.post("/gallery.reg")
def galleryReg(title:str=Form(), id:str=Form(), desc:str=Form()):
    return gDAO.reg(title, id, desc)

@app.post("/reply.reg")
def replyReg(id:str=Form(), gno:int=Form(), desc:str=Form()):
    return gDAO.replyReg(id, gno, desc)

@app.get("/reply.delete")
def replyDelete(no):
    return gDAO.replyDel(no)

@app.get("/thread.delete")
def threadDelete(no):
    return gDAO.threadDel(no)

@app.get("/thread.get")
def threadGet(no):
    return gDAO.threadGet(no)