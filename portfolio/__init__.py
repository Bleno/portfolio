from pyramid.config import Configurator
from pyramid_beaker import session_factory_from_settings
from pyramid.authentication import AuthTktAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
from portfolio.models.permissions import groupfinder
from portfolio.views.routes.routes import get_routes

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    session_factory = session_factory_from_settings(settings)
    authn_policy = AuthTktAuthenticationPolicy('secretstring',
                                                callback=groupfinder)
    authz_policy = ACLAuthorizationPolicy()

    config = Configurator(settings=settings, session_factory=session_factory,
                       root_factory='portfolio.models.permissions.RootFactory',
                       authentication_policy=authn_policy,
                       authorization_policy=authz_policy)
    config.include('pyramid_chameleon')
    config.include('pyramid_beaker')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('list_user', '/list_user/')
    config.add_route('ajax_user', '/ajax_user/')
    config.add_route('datatable','/datatable/')
    config.add_route('download','/download/{id_doc}')

    get_routes(config)

    config.scan()
    return config.make_wsgi_app()
