# -*- encoding: utf-8 -*-
# file group_view.py
from pyramid.view import view_config # configuração de view
#colander e outros esquemas de formulário
from colander import Schema, SchemaNode, String
from deform.widget import TextInputWidget
from deform import Button
from pyramid_deform import FormView
from pyramid.httpexceptions import HTTPFound

#classes do projeto
from portfolio.models.group import GroupModel
from portfolio.br.group_br import GroupBR

class GrupoSchema(Schema):
    str_nm_group = SchemaNode(String(), title="Nome do grupo",
    		    widget=TextInputWidget(placeholder='Nome Grupo',
    		    	    css_class="shiny required"))






@view_config(name='group_add', renderer='../templates/form.pt')
class Group(FormView):
    schema = GrupoSchema()
    buttons = ('Cadastrar',)
    form_options = (('formid','pyramid-deform'),
    		    ('css_class','main example1'))
    title = 'Grupo'

    def Cadastrar_success(self, appstruct):
        group = GroupModel(**appstruct)
        result = GroupBR().insert(group)
        if result > 0:
            return HTTPFound(location='group/{id}')
        else:
            return HTTPFound(location='/')





