from flask import jsonify, request
from src.services.book_service import ReservationService
from src.services.book_service import BookService
from src.utils.error_handler import handle_api_exception


class BookController:
    def __init__(self):
        self.book_service = BookService(ReservationService())

    @handle_api_exception
    def add_book(self):
        data = request.get_json()
        title = data.get('title')
        author = data.get('author')
        genre = data.get('genre')
        quantity = data.get('quantity')
        isbn = data.get('isbn')

        book = self.book_service.add_book(title, author, isbn, genre, quantity)

        return {
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'genre': book.genre,
            'quantity': book.quantity,
            'isbn': book.isbn
        }, 'Book added successfully', 201

    @handle_api_exception
    def update_book(self, book_id):
        data = request.get_json()
        title = data.get('title')
        author = data.get('author')
        genre = data.get('genre')
        quantity = data.get('quantity')
        isbn = data.get('isbn')

        book = self.book_service.update_book(book_id, title, author, isbn, genre, quantity)

        return {
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'genre': book.genre,
            'quantity': book.quantity,
            'isbn': book.isbn
        }, 'Book updated successfully', 200

    @handle_api_exception
    def delete_book(self, book_id):
        self.book_service.delete_book(book_id)
        
        return {},'Book deleted successfully', 200

    @handle_api_exception
    def get_all_books(self):
        books = self.book_service.get_all_books()
        serialized_books = [book.as_dict() for book in books]
        response = jsonify(serialized_books)
        return response, 'Success', 200

    @handle_api_exception
    def search_books(self):
        search_query = request.json.get('query')

        books = self.book_service.search_books(search_query)
        response = {'books': [book.as_dict() for book in books]}
        return response, 'Search Success' ,200

    @handle_api_exception
    def reserve_book(self, book_id):
        success = self.book_service.reserve_book(book_id)

        if success:
            response = {'message': 'Book reserved successfully'}
            return response, 200
        else:
            response = {'message': 'Book out of stock'}
            return response, 409

    @handle_api_exception
    def get_book_by_id(self, book_id):
        book = self.book_service.get_book_by_id(book_id)

        if book:
            return {
                'id': book.id,
                'title': book.title,
                'author': book.author,
                'genre': book.genre,
                'quantity': book.quantity,
                'isbn': book.isbn
            }, 'Book found', 200
        else:
            return {}, 'Book not found', 404