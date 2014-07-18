#!/usr/bin/env python
# -*- coding: utf-8 -*-

from pyramid.view import view_config
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response

from portfolio.br.file_br import FileBR
from portfolio.dao.file_dao import FileDao
from portfolio.models.fileupload import UploadFile



from io import StringIO

#from BRLightLib.Modelos import Doc




@view_config(name = "upload2",
             renderer = "../templates/formFile2.pt")
def uploadFile(request):
    if request.method == "POST":
        print("111111111111111111111111111")
        filename = request.POST['file'].filename
        print("222222222222222222222222222")
        input_file = request.POST['file'].file
       # print "111111111111111111111111111"
        input_file.seek(0)
        #print "111111111111111111111111111"
        data = input_file.read()
       
        files = {'arquivo_anexo':(filename, data)} #dicionario que é passado como parametro

        nr_id_doc = FileBR().multi_upload(files)
       
        #mimetype = "teste";

        #doc = Doc(filename, mimetype)

        #doc.uuid = nr_id_doc

        #doc.id_doc = 0

        # upfile = UploadFile()

        # upfile.str_observacao = "pyramid"

        # upfile.arquivo_anexo = nr_id_doc

       # print "999999999999999999999999999"
        #id_reg = FileBR().insert_doc(upfile)
        #print "555555555555555555555555555"
        return Response(nr_id_doc)
        #return HTTPFound(location = "/") #redirecinando a pagina

    else:
        return { }




@view_config(route_name='download')
def download(request):

    id_doc = request.matchdict['id_doc']

    obj_file = FileBR().download_file(id_doc)
    
    print(obj_file)
    obj_file.content.seek(0)

    valor = obj_file.content.getvalue()
    
    #valor = open('/tmp/Crimes Cruzados - The Pirate Filmes.mp4','rb').read()
    disposition = 'attachment; filename={0}'.format(obj_file.filename)
    #disposition = 'attachment; filename={0}'.format('Crimes Cruzados - The Pirate Filmes.mp4')

    return Response(valor, content_type = obj_file.content_type, content_disposition = disposition)
    #return Response(valor, content_type = 'video/mp4', content_disposition = disposition)


@view_config(name = 'list_files', renderer = '../templates/datatable_files.pt')
def list_files(request):
    return {}




