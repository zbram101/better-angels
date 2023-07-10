from flask import jsonify, request
from src.services.auth_service import AuthService
from src.utils.error_handler import handle_api_exception


class AuthController:

    def __init__(self):
        self.auth_service = AuthService()

    @handle_api_exception
    def register(self):
        data = request.get_json()
        email = data['email']
        self.auth_service.register(data['name'], email, data['password'], data['user_type'])
        return  {
            'token': self.auth_service.get_token(email),
            'email': email,
            'user_type': data['user_type'],
            'name': data['name']
        }, 'User registered successfully', 200

    @handle_api_exception
    def login(self):
        data = request.get_json()
        user = self.auth_service.login(data['email'], data['password'])
        return {
            'token': self.auth_service.get_token(user.email),
            'email': user.email,
            'name': user.name,
            'user_type': user.user_type
        }, 'User logged in successfully', 200
