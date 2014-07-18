from portfolio.dao.file_dao import FileDao


class FileBR(object):
        

    def upload_file(self, file_binary, name_field):
        return FileDao().upload_file(file_binary, name_field)

    def insert_doc(self, obj_reg):
        return FileDao().insert_doc(obj_reg)

    
    def multi_upload(self, files):
        return FileDao().multi_files(files)

    def download_file(self, id_doc):
        return FileDao().download_file(id_doc)

    def getListFiles(self, objPesquisa):
        return FileDao().getListFiles(objPesquisa)
