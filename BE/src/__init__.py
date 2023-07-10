from flask import Flask
import json
from flask_cors import CORS
from enum import Enum
from .db import create_database
from datetime import datetime
import os

# env variable for database config
db_name = os.environ['DB_NAME']
db_username = os.environ['DB_USERNAME']
db_password = os.environ['DB_PASSWORD']
db_host = os.environ['DB_HOST']

# init Flask app
app = Flask(__name__)
CORS(app, origins=['*'])


class MyJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Enum):
            return obj.value
        elif isinstance(obj, datetime):
            return obj.isoformat()
        return json.JSONEncoder.default(self, obj)


def create_app(env):

    #define custom json encoder for json package so it knows our custom enums
    app.json_encoder = MyJSONEncoder

    app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{db_username}:{db_password}@{db_host}:5432/{db_name}"
    create_database(app)
        
    # import all routes
    from .routes.auth import auth
    from .routes.book import book_routes
    from .routes.user import user
    # url_prefix can add a prefix to the url
    app.register_blueprint(auth,url_prefix='/')
    app.register_blueprint(book_routes,url_prefix='/')
    app.register_blueprint(user,url_prefix='/')


    return app
