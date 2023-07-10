from src import create_app
import os


application = create_app(os.environ.get('ENV'))
if __name__ == '__main__':
    application.run(host='0.0.0.0',debug=True)
