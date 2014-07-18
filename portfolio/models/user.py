class User(object):

    __parent__ = __name__ = None
    def __init__(self, id_reg="", str_nm_user="", str_email="", str_login="",
                 str_password="", bool_status=False, str_group_user=[]):
        super(User, self).__init__()
        self.id_reg= id_reg
        self.str_nm_user = str_nm_user
        self.str_email = str_email
        self.str_login = str_login
        self.str_password = str_password
        self.bool_status = bool_status
        self.str_group_user = str_group_user

    def getSaveStructure():
        return {"str_nm_user":self.str_nm_user ,
                "str_group_user":self.str_group_user,
                "str_email":self.str_email,
                "str_login":self.str_login,
                "str_password":self.str_password,
                "bool_status":self.bool_status,
                                }
