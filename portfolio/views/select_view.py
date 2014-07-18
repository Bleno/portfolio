from pyramid.response import Response
from pyramid.renderers import render_to_response
from pyramid.view import view_config
from pyramid.renderers import render

@view_config(name='consult-user', renderer='../templates/ConsultaUser.pt')
def consultar(request, id):
    resultado = Base("pp_user").getRegById(int(id))
    return {'resultado':resultado}

