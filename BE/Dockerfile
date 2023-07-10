FROM python:3.9
# Use the official Python 3.9 base image as the starting point.

WORKDIR /app
# Set the working directory inside the container to /app.
# Subsequent instructions will be executed from this directory.

COPY . /app
# Copy the application files from the host machine to the /app directory inside the container.

RUN pip3 install -r requirements.txt
# Run the pip3 install command inside the container to install the Python dependencies listed in requirements.txt.
# Assumes the requirements.txt file is present in the copied code.

EXPOSE 5000
# Expose port 5000 to allow communication with the container on that port.
# This instruction serves as documentation and does not actually publish the port.

ENTRYPOINT sleep 15 && flask db upgrade && ENV=local JWT_KEY=SOME_KEY python3 app.py
# Set the command to run when the container starts.
# In this case, it sets the environment variables ENV and JWT_KEY to 'local' and 'SOME_KEY' respectively,
# and executes the app.py script using the Python 3 interpreter.

