# -*- encoding: utf-8 -*-

from .factory import RouteFactory
from .views_handlers import Handlers
from portfolio.views.login import Login
from portfolio.views.media.imagens import profile

def get_routes(config):
    config.add_route('login', '/login', factory=RouteFactory)
    config.add_view(view=Login, route_name='login', renderer='templates/login.pt')

    config.add_route('profile','/profile/{profile_image}', factory=RouteFactory)
    config.add_view(view=profile, route_name='profile')

