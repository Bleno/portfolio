# -*- encoding: utf-8 -*-
from pyramid.view import view_config
from portfolio.br.user_br import UserBR
from portfolio.models.user import User
from colander import Schema, SchemaNode, String
from deform.widget import PasswordWidget, TextInputWidget, CheckboxWidget
from deform import Button
from pyramid.httpexceptions import HTTPFound
from pyramid.security import Allow
from pyramid.security import forget
from pyramid.security import remember
from pyramid.view import view_config
from pyramid_deform import FormView
from pyramid.response import Response
from portfolio.views.select_view import consultar

@view_config(route_name = 'list_user' ,
		renderer = "../templates/datatable.pt")
def getAllUsers(request):
    list_results = UserBR().getAllUsers()['results']
    return {'title':'Tabela','results': list_results }

@view_config(route_name = 'datatable',
		renderer = '../templates/datatablejs.pt')
def userDataTable(request):
	return {'title':'Datatable'}

class CadastroSchema(Schema):
    str_nm_user = SchemaNode(String(), title="Nome",
                          widget=TextInputWidget(placeholder='Usuário',
                          css_class="shiny required",))
    str_email = SchemaNode(String(), title="Email",
                          widget=TextInputWidget(placeholder='Usuário',
                          css_class="shiny required",))
    str_login = SchemaNode(String(), title="Login",
                          widget=TextInputWidget(placeholder='Usuário',
                          css_class="shiny required",))
    str_password = SchemaNode(String(), title="Password",
                          widget=PasswordWidget(css_class="shiny required",
                                                placeholder="Usuário"))
    
@view_config(name='add', renderer='../templates/form.pt')
class Usuario(FormView):
    schema = CadastroSchema()
    buttons = ('Cadastro',)
    form_options = (('formid', 'pyramid-deform'),
                    ('css_class',"main example1"))
    title = "Log in"
    def Cadastro_success(self, appstruct):
        user = User(**appstruct)
        base = Base('pp_user')
        result = base.insert(user)
        return consultar(self.request,result)




