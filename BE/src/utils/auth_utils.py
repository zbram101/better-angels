from functools import wraps
from flask import request, jsonify
import os
import jwt
from src.models.User import User

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(' ')[1]

        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, os.environ.get('JWT_KEY'), algorithms=['HS256'])
            user_id = data.get('sub')
            if user_id:
                current_user = User.query.get(user_id)
            else:
                return jsonify({'message': 'Invalid token data'}), 401
        except jwt.exceptions.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401

        kwargs['current_user'] = current_user
        return f(*args, **kwargs)

    return decorated
