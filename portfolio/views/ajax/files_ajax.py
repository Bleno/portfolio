# -*- encoding: utf-8 -*-
import json
import traceback
from pyramid.view import view_config
from pyramid.response import Response


from portfolio.br.file_br import FileBR
from liblightbase.lbsearch.search import Search

@view_config(name = 'ajax_files', renderer='json')
def json_user(request):
    try:
        # recebe os parametros do datatable
        offset = request.GET['iDisplayStart']
        limit = request.GET['iDisplayLength']
        #order_by = request.GET['iSortCol_0']
        sEcho = request.GET['sEcho']
        sSearch = request.GET['sSearch']
    



        query = Search()
        query.select = ['mimetype', 'filename', 'id_doc']
        query.limit = int(limit)
        query.offset = int(offset)
        if sSearch :
            query.literal = "UPPER(texto_doc) like '%{}%' OR UPPER(filename) like like '%{}%'".format(sSearch)

        dict_data = FileBR().getListFiles(query)
        datatable_return = {}
        # json_data = json_data.replace('offset','iDisplayStart')\
        #                     .replace('limit','DisplayLength')\
        #                     .replace('result_count','iTotalDisplayRecords')\
        #                     .replace('results','aaData')

        datatable_return['iDisplayStart'] = dict_data['offset']
        datatable_return['DisplayLength'] = dict_data['limit']
        datatable_return['iTotalDisplayRecords'] = dict_data['result_count']
        datatable_return['aaData'] = dict_data['results']
        return datatable_return
        #return Response(json_data, content_type='application/json')
    except Exception as e:
        print(str(traceback.format_exc()))
        dict_data = {'aaData': [], "sEcho": sEcho,"iTotalRecords": limit ,"iTotalDisplayRecords": 0 }
        
        json_data = json.dumps(dict_data)
        
        return Response(json_data, content_type='application/json')
