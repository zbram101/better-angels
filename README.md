# Welcome to the Library/Bookstore

There are 3 types of users for this application ( ADMIN, LIBRARIAN, CUSTOMER)

LIBRARIAN and CUSTOMER can register via the UI ADMIN can only be added via postman.

LIBRARIAN and ADMIN can search, add, edit, delete books they can also see the list of users.
CUSTOMER can only search and reserve books

Reservation is a simple counter that just keep track of number of books avaliable. 

## Prerequisites

Before getting started, make sure you have the following:

- Node version 18 or higher
- Python version 3.9
- Docker installed
- PostgresSql

## Build and Deployment with Docker

To build and deploy the application using Docker, follow these steps:

1. Run the following command: docker-compose up --build

2. This will start the API on port 5000, and the UI will be accessible on port 80. Once the application has built and started, navigate to [http://localhost/login](http://localhost/login) in your web browser.


## Test Data

db: To connect to postgres running in docker connect to port 5433
api: [http://localhost:5000/books](http://localhost:5000/books)
ui: [http://localhost/login](http://localhost/login)

1. Manual steps: 
    - Create a LIBRARIAN user 
    - Add books
    - Create a CUSTOMER user
2. auto load data:
    - After application is running
    - In BE folder run `python3 src/startup_data.py`



## Deployment on Kubernetes Cluster

**Note: Before deploying, update the image names in the `k8-deploy.yaml` file with the appropriate image names you have created.**

To deploy the application on a Kubernetes cluster, follow these steps:

1. Run the following command: kubectl apply -f k8-deploy.yaml

2. The application will be deployed based on the configuration specified in the `k8-deploy.yaml` file.


## Architecture / Standards FE

The frontend of the application is developed using React. It utilizes Redux, a state management library, along with the Redux Toolkit for a more streamlined development experience. React Hook Form is used to handle form validation and error handling, providing a user-friendly experience.

### Design Choices

The choice of React and Redux was made to ensure a modular and scalable architecture for the frontend. React allows for the creation of reusable UI components, while Redux facilitates centralized state management, making it easier to handle application-wide data. The usage of Redux Toolkit further simplifies the implementation of Redux with its built-in tools and best practices.

### Folder Structure

The folder structure of the application follows a standardized pattern to organize the codebase and promote modularity and reusability. Here are the main folders and their purposes:

- **store**: This folder contains the global state management configuration, including Redux store setup and reducers.
- **_components**: In this folder, shared components are stored. These components can be reused across different features or pages of the application. The `App.jsx` file is typically used to import and render these shared components.
- **_helpers**: This folder contains various helper functions and utility modules that assist in common tasks, such as wrapper functions, page history tracking, and other reusable helpers. These utilities help improve code organization and maintainability.
- **_service**: The `_service` folder houses service files that handle the API layer integration. These files encapsulate the logic for making API calls, handling responses, and transforming data. It is recommended to move the API call logic out of the Redux store to separate concerns and improve code structure. 
- **features**: The `features` folder is where you will find components specific to different features or sections of the application. Each feature can have its own folder containing related components, styles, and routes. This modular approach helps isolate and organize the codebase based on different application functionalities.

This folder structure allows for a clear separation of concerns, promotes code reuse, and facilitates maintainability and scalability of the Library/Bookstore application.

### Wrappers

External dependencies, like the HTTP client, can have wrappers to abstract away the implementation details. This makes it easier to switch to a different HTTP client if needed.

### TypeScript Considerations

In hindsight, using TypeScript instead of JavaScript would have been beneficial. TypeScript provides stricter type checking, making the application more resilient to failures. It also provides structured types and helps eliminate the usage of strings in application code by leveraging enums and interfaces.

## Areas to Improve (Given Time) FE

Although the application functions as expected and handles most edge cases, there are areas that can be improved:

1. **Expand Service Folder:** Consider creating service files to manage the responses from API calls. Instead of directly setting the data to the Redux store, the service files can handle the response and interact with the store. Additionally, centralize interactions with localStorage in a "localStorageService" to ensure consistent usage.

2. **Upgrade to TypeScript:** Upgrading the project to TypeScript brings the benefits of strict types, making the application more robust and providing better type checking. It also helps remove the usage

3. **Automated Testing:** Add unit tests for each feature, componenets, helpers, service 




## Architecture / Standards BE

The backend of the application is built using Flask, a lightweight Python web framework, following the MVC (Model-View-Controller) architectural pattern. The backend adheres to the SOLID principles, emphasizing Separation of Concerns. It leverages SQLAlchemy with Flask-Migrate for efficient management of the PostgreSQL database.

### Design Choices

The selection of Flask as the backend framework was driven by its simplicity, flexibility, and ease of use. The MVC pattern allows for clear separation between models (representing the data structure), views (handling response generation and processing), and controllers (handling business logic). SQLAlchemy with Flask-Migrate provides a powerful database management solution, enabling efficient data handling and migration operations.


### Folder Structure

The backend folder structure adheres to the separation of components:

- **Routes**: Contains route definitions for external views, mapping endpoints to corresponding controller methods.
- **Controllers**: Handles request processing and response gathering, encapsulating the business logic of the application.
- **Models**: Defines the data structure using SQLAlchemy's declarative syntax and represents the database schema.
- **Services**: Provides access to models and acts as an intermediary layer between controllers and models, performing database operations.
- **Utils**: Contains reusable utility functions and helper classes for common tasks.

### Decorators

Decorators such as `@token_required`  `@handle_api_exception` `@validate_request_required_fields` facilitate separation between business logic, auth, validation, and error management.

## Areas to Improve (Given Time) BE

1. **Scalability Management**: Implement pagination in both the UI and API layers to handle large datasets, ensuring performance with a significant number of books.Also search route might be the most used and with growing books it would be advised to move that functionality to its own instance in k8. 

2. **Error Handling:** While basic error handling is enabled, further enhancements can be made to implement more robust error management, including standardized error responses and logging.

3. **Swagger Documentation:** Consider integrating Swagger to provide a user-friendly and interactive API documentation, making it easier for developers to understand and test the available endpoints.

3. **Automated Testing:** Add unit tests for each service