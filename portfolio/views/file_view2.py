#!/usr/bin/env python
# -*- coding: utf-8 -*-

from pyramid.view import view_config
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response

from portfolio.br.file_br import FileBR
from portfolio.models.fileupload import pp_files
from portfolio.models.srov import Srov
import json
from io import StringIO

@view_config(name = "upload2",
             renderer = "../templates/formFile2.pt")
def uploadFile(request):
    if request.method == "POST":
        print("111111111111111111111111111")
        filename = request.POST['file'].filename
        print("222222222222222222222222222")
        input_file = request.POST['file'].file
        input_file.seek(0)
        binary_content = input_file.read()
        
        file_tuple = (filename, binary_content)
        json_file = FileBR().upload(file_tuple)
        dict_json = json.load(StringIO(json_file))
        print(json_file)
        pp_files_obj = pp_files('Pyramid', dict_json)
        print(pp_files_obj.__dict__)
        nr_id_doc = FileBR().create_document(pp_files_obj)

        return Response(nr_id_doc.text)

    else:
        return { }




@view_config(route_name='download')
def download(request):

    id_doc = request.matchdict['id_doc']
    print('>>>>>>>>>>>>>>>>>>> ', id_doc)
    obj_file = FileBR().download(id_doc)
    
    #print(obj_file)
   # obj_file.content.seek(0)

    valor = obj_file[1]
    
    #valor = open('/tmp/Crimes Cruzados - The Pirate Filmes.mp4','rb').read()
    disposition = 'attachment; filename={0}'.format(obj_file[0]['filename'])
    #disposition = 'attachment; filename={0}'.format('Crimes Cruzados - The Pirate Filmes.mp4')

    return Response(valor, content_type = obj_file[0]['mimetype'], content_disposition = disposition)
    #return Response(valor, content_type = 'video/mp4', content_disposition = disposition)


@view_config(name = 'list_files', renderer = '../templates/datatable_files.pt')
def list_files(request):
    return {}




