# -*- encoding: utf-8 -*-
# user_dao.py 
# arquivo responssavel pela comunicação com o rest

from liblightbase.lbrest.document import DocumentREST
from liblightbase.lbsearch.search import Search
from liblightbase.lbutils.conv import *
from liblightbase.lbutils import *
from portfolio.models.user import User
from portfolio.models.srov import Srov



class UserDao(object):
    def __init__(self, name_base = "pp_user"):
        self.name_base = name_base

    BASENAME = "pp_user"

    def checkUser(self, user):
        #p= Pesquisa()
        #p.setSelect("json_reg")
        #p.setSelect("id_reg")
        query = Search()
        query.literal = " str_login = '{0}' and str_password = '{1}' ".format(user.str_login, user.str_password )
        query.limit = 1
        base = json2base(User.__json__())
        collection = DocumentREST("http://api.brlight.net/api", base).get_collection(query)
        if collection.result_count:
            user_login = collection.results[0]
            return Srov(True, user_login ,"Usuario logado com sucesso")
        else:
            return Srov(False, user ,"Usuário ou senha incorretos")


    def getAllUsers(self):
        pass
        pesquisa = Pesquisa()
        pesquisa.setSelect('json_reg')
        pesquisa.limit = None
        base = Base(self.name_base)
        json_data = StringIO( base.research(pesquisa))
        dict_data = json.load(json_data)
        del(pesquisa)
        return dict_data

    def getJsonUsers(self, search):
        pass
        base = Base(self.name_base)
        json_data = base.research(search)
        return json_data
