from flask import jsonify, request
from src.services.user_service import UserService
from src.utils.error_handler import handle_api_exception


class UserController:

    def __init__(self):
        self.user_service = UserService()

    @handle_api_exception
    def get_all_users(self):
        all_users = self.user_service.get_all_users()
        serialized_users = [user.as_dict() for user in all_users]
        response = jsonify(serialized_users)
        return  response, 'Success', 200
