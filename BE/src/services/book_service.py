from src.models.Book import Book
from src.utils.error_handler import APIException
from ..db import db

class ReservationService:
    def reserve_book(self, book):
        if book.quantity > 0:
            book.quantity -= 1
            db.session.commit()
            return True
        else:
            return False

class BookService:

    def __init__(self, reservation_service):
        self.reservation_service = reservation_service

    def add_book(self, title, author, isbn, genre, quantity):
        book = Book(title=title, author=author, isbn=isbn, genre=genre, quantity=quantity)
        db.session.add(book)
        db.session.commit()
        return book

    def update_book(self, book_id, title=None, author=None, isbn=None, genre=None, quantity=None):
        book = Book.query.get(book_id)
        if not book:
            raise APIException('Book not found', 404)

        if title:
            book.title = title
        if author:
            book.author = author
        if isbn:
            book.isbn = isbn
        if genre:
            book.genre = genre
        if quantity is not None:
            book.quantity = quantity

        db.session.commit()
        return book

    def delete_book(self, book_id):
        book = Book.query.get(book_id)
        if not book:
            raise APIException('Book not found', 404)

        db.session.delete(book)
        db.session.commit()

    def get_all_books(self):
        books = Book.query.all()
        return books

    def search_books(self, search_query):
        books = Book.query.filter(
            (Book.title.ilike(f"%{search_query}%")) | (Book.author.ilike(f"%{search_query}%"))
        ).all()
        return books

    def get_book_by_id(self, book_id):
        book = Book.query.get(book_id)
        return book
    
    def reserve_book(self, book_id):
        book = Book.query.get(book_id)
        success = self.reservation_service.reserve_book(book)

        return success