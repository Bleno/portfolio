# -*- encoding: utf-8 -*-
# user_dao.py 
# arquivo responssavel pela comunicação com o rest

#from BRLightLib.Modelos import Pesquisa
#from BRLightLib.Base import Base


class FileDao(object):

    def __init__(self, base_name = "pp_files"):
        self.base_name = base_name


    def upload_file(self, file_binary, name_field):
        id_doc = Base(self.base_name, "doc").upload(file_binary, name_field)
        return id_doc


    def insert_doc(self, obj_reg):
        return Base(self.base_name).insert(obj_reg)


    def multi_files(self, files):
        return Base(self.base_name, "doc").multi_upload(files)


    def download_file(self, id_doc):
        return Base(self.base_name, "doc").download(id_doc)


    def getListFiles(self, objPesquisa):
        return Base(self.base_name, "doc").research(objPesquisa)
