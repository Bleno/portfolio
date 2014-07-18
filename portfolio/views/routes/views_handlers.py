# -*- encoding: utf-8 -*-

import time
from portfolio.views.login import Login

class Handlers(object):
    def __init__(self, factory, request):
        self.factory = factory
        self.request = request

    # - handler - manipulador de views
    def handler_login(request):
        return {}

    def handler_files(request):
        return {}

    def handler_API_LBN(request):
        str_assunt = request.POST["str_assunt"]
        # dt_last_mod = time.strftime("%d/%m/%Y %H:%M:%S")
        # bol_sts_user = True
        # app_configHolder = app_config("str_nm_app", [0,1,2])
        # app_configHolderArray = [app_configHolder,app_configHolder,app_configHolder]
        # settingsHolderDictionary = {"app_config": app_configHolderArray, "str_ds_initial_page": "Text"}
        # str_nm_group = ["one","two","tree"]
        # return Response(str_assunt)
        # return request
        return {}







