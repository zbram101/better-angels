from flask import Blueprint
from src.controllers.auth import AuthController
from src.utils.helpers import prepare_response
from src.utils.helpers import validate_request_required_fields
from src.utils.auth_utils import token_required

auth = Blueprint('auth', __name__)
auth_controller = AuthController()

@auth.route('/register', methods=['POST'])
@validate_request_required_fields(['name', 'email', 'password', 'user_type'])
def register_route():
    return prepare_response(*auth_controller.register())


@auth.route('/login', methods=['POST'])
@validate_request_required_fields(['email', 'password'])
def login_route():
    return prepare_response(*auth_controller.login())
    

# Route that requires authentication
@auth.route('/token_verify', methods=['GET'])
@token_required
def protected_route(current_user):
    return prepare_response(message='You are logged in as ' + current_user.name)

