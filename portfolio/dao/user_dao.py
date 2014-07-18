# -*- encoding: utf-8 -*-
# user_dao.py 
# arquivo responssavel pela comunicação com o rest

#from BRLightLib.Modelos import Pesquisa
#from BRLightLib.Base import Base
from portfolio.models.user import User
from portfolio.models.srov import Srov
from io import StringIO
import json


class UserDao(object):
    def __init__(self, name_base = "pp_user"):
        self.name_base = name_base

    BASENAME = "pp_user"

    def checkUser(self, user):
        p= Pesquisa()
        p.setSelect("json_reg")
        p.setSelect("id_reg")
        p.literal = " str_login = '{0}' and str_password = '{1}' ".format(user.str_login, user.str_password )
        base = Base(self.name_base)
        json_data = StringIO( base.research(p))
        dict_data = json.load(json_data)
        a = dict_data
        if a['result_count']:
            id_reg =  a['results'][0]['id_reg']
            nome = a['results'][0]['json_reg']['str_nm_user']
            email = a['results'][0]['json_reg']['str_email']
            login = a['results'][0]['json_reg']['str_login']
            senha = a['results'][0]['json_reg']['str_password']
            status = a['results'][0]['json_reg']['bool_status']
            group = a['results'][0]['json_reg']['str_group_user']
            user = User(id_reg, nome, email,login, senha, status, group)
            return Srov(True, user ,"Usuario logado com sucesso")
        else:
            return Srov(False, None ,"Usuário ou senha incorretos")


    def getAllUsers(self):
        pesquisa = Pesquisa()
        pesquisa.setSelect('json_reg')
        pesquisa.limit = None
        base = Base(self.name_base)
        json_data = StringIO( base.research(pesquisa))
        dict_data = json.load(json_data)
        del(pesquisa)
        return dict_data

    def getJsonUsers(self, search):
        base = Base(self.name_base)
        json_data = base.research(search)
        return json_data
