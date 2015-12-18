# -*- encoding: utf-8 -*-
""" user_dao.py 
# arquivo responssavel pela comunicação com o rest
"""

from liblightbase.lbrest.file import FileREST
from liblightbase.lbrest.document import DocumentREST
from liblightbase.lbutils import *
from liblightbase.lbrest.base import BaseREST
import json
import requests

class FileDao(object):

    def __init__(self, base_name = "pp_files"):
        """"
            TODO deixa o obj base em memória
        """
        self.base_name = base_name
        self.url_base = "http://api.brlight.net/api"
        self.base_obj = BaseREST(self.url_base).get(self.base_name)

    def upload(self, files):
        return FileREST(self.url_base, self.base_name).upload(files)

    def create_document(self, document):
        json_document = json.dumps(document.__dict__)
        print(json_document)
        return DocumentREST(self.url_base, self.base_obj ).create(json_document)

    def download(self, id_doc):
       return FileREST(self.url_base, self.base_name).download(id_doc)

    def getListFiles(self, query):
        json_query = query._asjson()
        req = requests.get(self.url_base+ "/"+ self.base_name + "/" + "doc?$$={}".format(json_query) )
        return req.json()
        #return DocumentREST(self.url_base, self.base_obj, True ).get_collection(json_query)
