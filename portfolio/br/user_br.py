from portfolio.dao.user_dao import UserDao


class UserBR(object):

    def getAllUsers(self):
        dao = UserDao()
        return dao.getAllUsers()

    def getJsonUsers(self, search):
        dao = UserDao()
        return dao.getJsonUsers(search)

    def checkUser(self, user):
        userDao = UserDao()
        return userDao.checkUser(user)


