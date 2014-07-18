from portfolio.dao.group_dao import GroupDao


class GroupBR():

    def insert(self, obj):
        return GroupDao().insert(obj)
