FROM node:18
# Use the official Node.js 18 base image as the starting point.

WORKDIR /app
# Set the working directory inside the container to /app.
# Subsequent instructions will be executed from this directory.

COPY . /app
# Copy the application files from the host machine to the /app directory inside the container.

RUN npm install
# Run the npm install command inside the container to install the application dependencies.
# Assumes a package.json file is present in the copied code, containing the required dependencies.

EXPOSE 3000
# Expose port 3000 to allow communication with the container on that port.
# This instruction serves as documentation and does not actually publish the port.

ENTRYPOINT npm start
# Set the command to run when the container starts.
# In this case, it executes npm start to start the application.

