# -*- encoding: utf-8 -*-

from pyramid.view import view_config
from pyramid.response import Response
import json
from liblightbase.lbutils.codecs import *


@view_config(name = "teste")
def view_teste(request):
    js = request.body.decode("utf-8")
    dict_json = json2object(request.body.decode("utf-8"))
    #dict_json = json.loads(js)
    print(dict_json)
    print(dict_json["from"])
    print(dict_json["size"])
    return Response("ok")