from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
db = SQLAlchemy()
migrate = Migrate()



def create_database(app):
    #init db
    db.init_app(app)
    migrate.init_app(app,db)
    app.app_context().push()
    db.create_all(app=app)