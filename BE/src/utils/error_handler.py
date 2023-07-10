from functools import wraps
from flask import jsonify

class APIException(Exception):
    def __init__(self, message, status_code):
        super().__init__(message)
        self.status_code = status_code



def handle_api_exception(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except APIException as e:
            response = {
                'message': str(e),
            }
            return jsonify(response), str(e),e.status_code

    return decorated
