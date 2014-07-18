# -*- encoding: utf-8 -*-
import json
from pyramid.view import view_config
from pyramid.response import Response


from portfolio.br.file_br import FileBR
#from BRLightLib.Modelos import Pesquisa

@view_config(name = 'ajax_files')
def json_user(request):
    try:
        # recebe os parametros do datatable
        offset = request.GET['iDisplayStart']
        limit = request.GET['iDisplayLength']
        #order_by = request.GET['iSortCol_0']
        sEcho = request.GET['sEcho']
        sSearch = request.GET['sSearch']
    



        query = Pesquisa()
        query.select = ['mimetype', 'nome_doc', 'id_doc']
        query.limit = limit
        query.offset = offset
        if sSearch :
            query.literal = "texto_doc like '%{0}%'".format(sSearch)

        json_data = FileBR().getListFiles(query)
        json_data = json_data.replace('offset','iDisplayStart').replace('limit','DisplayLength').replace('result_count','iTotalDisplayRecords').replace('results','aaData')
        return Response(json_data, content_type='application/json')
    except Exception as e:
        dict_data = {'aaData': [], "sEcho": sEcho,"iTotalRecords": limit ,"iTotalDisplayRecords": 0 }
        
        json_data = json.dumps(dict_data)
        
        return Response(json_data, content_type='application/json')
