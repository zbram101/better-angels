from flask import Blueprint
from src.controllers.user import UserController
from src.utils.helpers import prepare_response
from src.utils.auth_utils import token_required

user = Blueprint('user', __name__)
user_controller = UserController()

@user.route('/user', methods=['GET'])
@token_required
def get_all_users(current_user):
    """
        Get All users Route

        curl --location 'http://127.0.0.1:5000/register' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "name":"CUSTOMER",
            "email":"customer@gmail.com",
            "password":"qweasd",
            "user_type":"CUSTOMER"
        } '
    """
    return prepare_response(*user_controller.get_all_users())

