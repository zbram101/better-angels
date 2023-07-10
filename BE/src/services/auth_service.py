from werkzeug.security import check_password_hash
from src.utils.error_handler import APIException
from ..db import db
from src.models.User import User

class AuthService:
    def register(self, name, email, password, user_type):
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            raise APIException('Email already exists. Please choose a different email.', 409)

        user = User(name=name, email=email, password=password, user_type=user_type)
        db.session.add(user)
        db.session.commit()

    def login(self, email, password):
        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password_hash, password):
            raise APIException('Invalid email or password', 401)

        return user

    def get_token(self, email):
        user = User.query.filter_by(email=email).first()
        token = user.encode_token()
        return token

    # Additional auth-related functions can be added here
    # such as reset password, forgot password, etc.
