# -*- encoding: utf-8 -*-

#group.py refente aos grupos da app

from colander import Schema

class GroupModel(object):
    
    def __init__(self, str_nm_group = '', bool_ativo = True):
        self.str_name_group = str_nm_group
        self.bool_ativo = bool_ativo


