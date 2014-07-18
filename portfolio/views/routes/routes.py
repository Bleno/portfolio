# -*- encoding: utf-8 -*-
from .factory import RouteFactory
from .views_handlers import Handlers
from portfolio.views.login import Login

def get_routes(config):
    config.add_route('login', '/login', factory=RouteFactory)
    config.add_view(view=Login, route_name='login', request_method='GET', renderer='templates/login.pt')

