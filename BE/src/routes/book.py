from flask import Blueprint, jsonify, request
from src.utils.helpers import prepare_response
from src.utils.helpers import validate_request_required_fields
from src.utils.auth_utils import token_required
from src.controllers.book import BookController

book_routes = Blueprint('book_routes', __name__)

book_controller = BookController()

@book_routes.route('/books', methods=['POST'])
@token_required
def add_book(current_user):
    return prepare_response(*book_controller.add_book())

@book_routes.route('/books/<book_id>', methods=['PUT'])
@token_required
def update_book(current_user, book_id):
    return prepare_response(*book_controller.update_book(book_id))

@book_routes.route('/books/<book_id>', methods=['DELETE'])
@token_required
def delete_book(current_user,book_id):
    return prepare_response(*book_controller.delete_book(book_id))

@book_routes.route('/books', methods=['GET'])
@token_required
def get_all_books(current_user):
    return prepare_response(*book_controller.get_all_books())

@book_routes.route('/books/search', methods=['POST'])
@token_required
def search_books(current_user):
    return prepare_response(*book_controller.search_books())

@book_routes.route('/books/<book_id>/reserve', methods=['POST'])
@token_required
def reserve_book(current_user, book_id):
    return prepare_response(*book_controller.reserve_book(book_id))

@book_routes.route('/books/<book_id>', methods=['GET'])
@token_required
def get_book_by_id(current_user, book_id):
    return prepare_response(*book_controller.get_book_by_id(book_id))
