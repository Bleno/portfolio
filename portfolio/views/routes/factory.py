# -*- encoding: utf-8 -*-

class RouteFactory(object):
    def __init__(self, request):
        self.request = request

    def getTitle(self):
        return "Portfólio Pyramid"
