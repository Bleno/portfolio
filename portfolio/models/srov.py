#-standard response object value - objeto padrao para resposta
class Srov(object):
    def __init__(self, status=None, data=None, message=None):
        super(Srov, self).__init__()
        self.status = status
        self.data = data
        self.message = message
