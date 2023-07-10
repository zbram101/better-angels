## Setup
To run only API in local: 

**Prerequisites:** Python version 3.9, postgresSql

1. **setup virual env** python3 -m venv .venv    
2. **activate** - source .venv/bin/activate
3. **install dependencies** - pip3 install -r requirements.txt
4. **start application** - ENV=local JWT_KEY=SOME_KEY DB_NAME=library DB_USERNAME=postgres DB_PASSWORD=letmein123 DB_HOST=localhost python3 app.py

Appliction will start on port 5000 access application with http://localhost:5000/books

## Docker Image:

To build the docker image run the following command.

docker build -t be-app .

