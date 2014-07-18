from pyramid.security import *

class RootFactory(object):
    __acl__ = [ (Allow, Authenticated, 'create'),
                (Allow, 'g:editor', 'edit'),
                (Allow, 'g:ecured', ALL_PERMISSIONS),
              ]
    def __init__(self, request):
        self.request = request
def groupfinder(request):
    user = request.session['usuario']
    return ['g:%s' % g for g in user.str_group_user]
