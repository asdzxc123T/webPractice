# async : await 들어있다
# await : 그 작업 하는 동안 다른 거 해도 된다
from uuid import uuid4

from fastapi.responses import FileResponse


class PhotoManager:
    def __init__(self):
        self.folder = "./photoManager/image/"

    async def upload(self, photo, title):
        file = await photo.read()
        fileName = photo.filename
        type = fileName[-4:]
        fileName = fileName.replace(type, "")
        fileName += "_" + str(uuid4()) + type
        f = open(self.folder + fileName, "wb")
        f.write(file)
        f.close()
        return {"title": title, "file": fileName}
    
    def getFile(self, photo):
        return FileResponse(self.folder + photo, filename=photo)