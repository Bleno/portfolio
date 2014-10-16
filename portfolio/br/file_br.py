from portfolio.dao.file_dao import FileDao
"""
Layer related business rules.
"""

class FileBR():
        

    def upload(self, files):
        return FileDao().upload(files)


    def create_document(self, document):
        return FileDao().create_document(document)

    def download(self, id_doc):
       return FileDao().download(id_doc)
