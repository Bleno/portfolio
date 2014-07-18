# -*- encoding: utf-8 -*-

from pyramid.view import view_config
from pyramid.view import notfound_view_config #altera o comportamento padrao, mudando a pagina do error 404
from pyramid.renderers import render_to_response #usando o render_to_response, facilitar o return
from pyramid.httpexceptions import HTTPFound
from pyramid_handlers import action
from pyramid.security import authenticated_userid
from pyramid.security import remember, forget

@view_config(route_name='home', renderer='../templates/home.pt'
             )#permission="edit")
def my_view(request):
    return {'title': 'Home'}

@view_config(name='chat', renderer='../templates/chat.pt')
def chat(request):
	return {}



@notfound_view_config()
def notfound(request):
    return render_to_response('../templates/404.pt',
                              {'title': 'Página não encontrada'},
                              request=request)
@view_config(renderer='../templates/500.pt',
             context='pyramid.exceptions.Forbidden')
@action(renderer='../templates/500.pt')
def forbidden(request):
    return {'title': 'Erro 500'}
