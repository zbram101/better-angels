import requests

API_BASE_URL = 'http://localhost:5000'  # Replace with the base URL of your API


# Temporary user data for authentication
user_credentials = {'email': 'martha', 'password': 'qweasd'}


temporary_users = [
    {'name': 'Martha', 'email': 'martha', 'password': 'qweasd', 'user_type': 'LIBRARIAN'},
    {'name': 'Jane', 'email': 'jane', 'password': 'qweasd', 'user_type': 'CUSTOMER'},
    {'name': 'Admin', 'email': 'admin', 'password': 'qweasd', 'user_type': 'ADMIN'},
    # Add more temporary user data as needed
]

temporary_books = [
    {'title': 'The Great Gatsby', 'isbn': '1234','author': 'F. Scott Fitzgerald', 'genre': 'FOLKLORE', 'quantity': 5},
    {'title': 'To Kill a Mockingbird', 'isbn': '1233', 'author': 'Harper Lee', 'genre': 'FOLKLORE', 'quantity': 10},
    {'title': 'Pride and Prejudice', 'isbn': '1232', 'author': 'Jane Austen', 'genre': 'FOLKLORE', 'quantity': 8},
    # Add more temporary book data as needed
]


def add_temporary_users():
    for user_data in temporary_users:
        response = requests.post(f'{API_BASE_URL}/register', json=user_data)
        if response.status_code == 201:
            print(f"User '{user_data['name']}' added successfully.")
        else:
            print(f"Failed to add user '{user_data['name']}'.")

def authenticate_user():
    response = requests.post(f'{API_BASE_URL}/login', json=user_credentials)
    print(response.status_code)
    if response.status_code == 200:
        data = response.json().get('data')
        token = data.get('token')
        return token
    else:
        raise Exception('Failed to authenticate user.')

def add_temporary_books(token):
    headers = {'Authorization': f'Bearer {token}'}
    for book_data in temporary_books:
        response = requests.post(f'{API_BASE_URL}/books', json=book_data, headers=headers)
        if response.status_code == 201:
            print(f"Book '{book_data['title']}' added successfully.")
        else:
            print(f"Failed to add book '{book_data['title']}'.")

add_temporary_users()

# Authenticate the user and obtain the token
token = authenticate_user()

# Call the functions to add temporary users and books\
add_temporary_books(token)
