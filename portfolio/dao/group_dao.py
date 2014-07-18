#from BRLightLib.Base import Base
#from BRLightLib.Modelos import Pesquisa



class GroupDao():
    
    def __init__(self, name_base = "pp_group"):
        self.name_base = name_base


    def insert(self, obj):
        return Base(self.name_base).insert(obj)
