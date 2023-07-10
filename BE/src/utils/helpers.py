from functools import wraps
from flask import request, Response, jsonify

def validate_request_required_fields(required_fields):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            data = request.get_json()
            missing_fields = [field for field in required_fields if field not in data]
            if missing_fields:
                return jsonify({'message': f"Missing required fields: {', '.join(missing_fields)}"}), 400
            return f(*args, **kwargs)

        return decorated

    return decorator


def prepare_response(data=None, message='Success', status=200):
    if isinstance(data, Response):
        data = data.get_json()
    elif hasattr(data, 'serialize'):
        data = data.serialize()
        
    response = {
        'status': status,
        'message': message,
        'data': data
    }

    return jsonify(response), status
