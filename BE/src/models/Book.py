from ..db import db
from datetime import datetime
from src.enums import BOOK_GENRE

    

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    isbn = db.Column(db.String(50), nullable=False)
    author = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.Enum(BOOK_GENRE))
    quantity = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, title, isbn, author, genre, quantity):
        self.title = title
        self.isbn = isbn
        self.author = author
        self.genre = genre
        self.quantity = quantity
        
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
