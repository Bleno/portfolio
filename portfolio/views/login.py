# -*- encoding: utf-8 -*-

from colander import Schema, SchemaNode, String
from deform.widget import PasswordWidget, TextInputWidget, CheckboxWidget
from deform import Button
from pyramid.httpexceptions import HTTPFound
from pyramid.security import Allow
from pyramid.security import forget
from pyramid.security import remember
from pyramid.view import view_config
from pyramid_deform import FormView
from portfolio.models.user import User
from portfolio.br.user_br import UserBR

class LoginSchema(Schema):
    username = SchemaNode(String(), title="User name",
                          widget=TextInputWidget(placeholder='Usuário',
                          css_class="input-block-level",))
    password = SchemaNode(String(), title="Password", 
                          widget=PasswordWidget(css_class="input-block-level",
                                                placeholder="Usuário"))
    remember = SchemaNode(String(), widget=CheckboxWidget(),
                          title='Remember me')

#@view_config(name='login', renderer='../templates/login.pt')
class Login(FormView):
    schema = LoginSchema()
    button_edit = Button(name='reset', title=None, type='reset',
                         value='Reset', disabled=False,
                         css_class=None)
    buttons = ('login',button_edit)
    form_options = (('formid', 'pyramid-deform'),
                    ('css_class', "form-signin"))
    title = "Log in"

    def login_success(self, appstruct):
        user = User( str_login=appstruct['username'], 
                    str_password= appstruct['password'])
        userBr = UserBR()
        usuario_logado = userBr.checkUser(user).data
        if usuario_logado:
            self.request.session['usuario'] = usuario
            return HTTPFound(location = "/")
        else:
            return self.bad_login()

    def bad_login(self):
        self.request.session.flash(
            "Your username/password combination  is incorrect.", "error")
