#!/usr/bin/env python
# -*- coding: utf-8 -*-

from pyramid.view import view_config
from pyramid.httpexceptions import HTTPFound
from pyramid.response import Response

from portfolio.br.file_br import FileBR
from portfolio.dao.file_dao import FileDao
from portfolio.models.fileupload import pp_files

from mimetypes import MimeTypes
import os
import uuid
from io import StringIO

#from BRLightLib.Modelos import Doc




@view_config(name = "upload",
             renderer = "../templates/formFile.pt")
def uploadFile(request):
    if request.method == "POST":
        filename = request.POST['file'].filename
        
        #return Response(repr(filename))
        
        mime = MimeTypes()

        mimetype = mime.guess_type(filename)[0]

        input_file = request.POST['file'].file
        
        #teste = str(type(request.POST['anexo'].file))


        file_path = os.path.join('/tmp', '{0}'.format(filename))

        temp_file_path = file_path # + "~"

        output_file = open(temp_file_path, 'wb')
        
        input_file.seek(0)

        file_read = input_file.read()
        
        f = StringIO(file_read)
        
        
        input_file.seek(0)
        while True:
            data = input_file.read(2<<16)
            if not data:
                break
            output_file.write(data)

        output_file.close()

        #temp_file_for_send = open(temp_file_path, "rb")

        nr_id_doc = FileBR().upload_file(file_path, "arquivo_anexo")
       
        #nr_id_doc = FileDao().upload_file(f, "arquivo_anexo")

        doc = Doc(filename, mimetype)

        doc.uuid = nr_id_doc

        doc.id_doc = 0

        upfile = UploadFile()

        upfile.str_observacao = "pyramid"

        upfile.arquivo_anexo = doc.__dict__


        id_reg = FileBR().insert_doc(upfile)

        return HTTPFound(location = "documento/" + id_reg)
        #input_file.seek(0)
        #text = input_file.read()
        #return Response(f.getvalue(), content_type='application/pdf') # retorna o proprio arquivo enviado
       # return Response(text)
        #return Response(f.tell())
        #return Response(nr_id_doc)

    else:
        return {}


