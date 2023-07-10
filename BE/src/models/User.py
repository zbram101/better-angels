from ..db import db
from datetime import datetime, timedelta
import os
from src.enums import USER_TYPE
from werkzeug.security import generate_password_hash
import jwt


# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    user_type = db.Column(db.Enum(USER_TYPE), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, name, email, password, user_type):
        self.name = name
        self.email = email
        self.password_hash = generate_password_hash(password),
        self.user_type = user_type

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def encode_token(self):
        payload = {
            'exp': datetime.utcnow() + timedelta(days=1),
            'iat': datetime.utcnow(),
            'sub': self.id
        }
        key = jwt.encode(
            payload,
            os.environ.get('JWT_KEY'),
            algorithm='HS256'
        )
        return key
 
    @staticmethod
    def decode_token(token):
        try:
            payload = jwt.decode(token, os.environ.get('JWT_KEY'))
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Token expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'
            
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

