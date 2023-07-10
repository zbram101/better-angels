

from src.models.User import User

class UserService:
    def get_all_users(self):
        users = User.query.all()
        return users
