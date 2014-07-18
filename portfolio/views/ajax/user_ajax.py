# -*- encoding: utf-8 -*-

from pyramid.view import view_config
from pyramid.response import Response


from portfolio.br.user_br import UserBR
#from BRLightLib.Modelos import Pesquisa

@view_config(route_name = 'ajax_user')
def json_user(request):
    try:
        # recebe os parametros do datatable
        offset = request.GET['iDisplayStart']
        limit = request.GET['iDisplayLength']
        #order_by = request.GET['iSortCol_0']
        sEcho = request.GET['sEcho']
        sSearch = request.GET['sSearch']
    



        query = Pesquisa()
        query.select.append("json_reg")
        query.limit = limit
        query.offset = offset
        if sSearch :
            query.literal = "str_nm_user like '%{0}%'".format(sSearch)

        json_data = UserBR().getJsonUsers(query)
        json_data = json_data.replace('offset','iDisplayStart').replace('limit','DisplayLength').replace('result_count','iTotalDisplayRecords').replace('results','aaData')
        return Response(json_data, content_type='application/json')
    except:
        json_data = """{ "aaData": [], "sEcho": "{0} ",
        		"iTotalRecords": "{1}",
        		"iTotalDisplayRecords": 0 }""".format(sEcho, limit)
        return Response(json_data, content_type='application/json')
