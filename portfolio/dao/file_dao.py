# -*- encoding: utf-8 -*-
# user_dao.py 
# arquivo responssavel pela comunicação com o rest

from liblightbase.lbrest.file import FileREST
from liblightbase.lbrest.document import DocumentREST
from liblightbase.lbutils import *

class FileDao(object):

    def __init__(self, base_name = "pp_files"):
        self.base_name = base_name
        self.url_base = "http://api.brlight.net/api"

    def upload(self, files):
        return FileREST(self.url_base, self.base_name).upload(files)

    def create_document(self, document):
        json_document = object2json(document.__dict__)
        print(json_document)
        return DocumentREST(self.url_base, self.base_name).create(document)

    def download(self, id_doc):
       return FileREST(self.url_base, self.base_name).download(id_doc)
