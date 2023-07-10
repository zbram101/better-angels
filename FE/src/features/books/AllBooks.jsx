import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bookActions, alertActions } from '_store';

export { AllBooks };

function AllBooks() {
  const allBooks = useSelector((state) => state.books.list);
  const user = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bookActions.getAll());
  }, []);


  const handleReserveBook = async (bookId,quantity,title) => {
    if(quantity < 1) return dispatch(alertActions.error(' Sorry No Stock avaliable '));
    await dispatch(bookActions.reserve(bookId ));
    dispatch(bookActions.getAll()); // Refresh the book list after reserving a book
    dispatch(alertActions.success(` ${title} reserved!`));
  };
  
  const handleDeleteBook = async (bookId) => {
    await dispatch(bookActions.delete(bookId));
    dispatch(bookActions.getAll()); // Refresh the book list after deleting a book
    dispatch(alertActions.success(`Book Deleted`));
  }

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    dispatch(bookActions.filteredSearch(searchTerm));
  };

  return (
    <div>
      <h1>Books</h1>
      {(['ADMIN', 'LIBRARIAN'].includes(user.data?.user_type)) && (<Link to="addEdit" className="btn btn-sm btn-success mb-2">Add Book</Link>) }
       <div className="mb-2">
        <input
          type="text"
          placeholder="Search by title or author"
          onChange={handleSearchChange}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Title</th>
            <th style={{ width: '10%' }}>Isbn</th>
            <th style={{ width: '10%' }}>Genre</th>
            <th style={{ width: '20%' }}>Author</th>
            <th style={{ width: '10%' }}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {allBooks?.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.isbn}</td>
              <td>{book.genre}</td>
              <td>{book.author}</td>
              <td>{book.quantity}</td>
              <td style={{ whiteSpace: 'nowrap' }}>

              {
                (['ADMIN', 'LIBRARIAN'].includes(user.data?.user_type)) && (
                  <div>
                    <Link to={`addEdit/${book.id}`} className="btn btn-sm btn-success mb-2">
                      Edit Book
                    </Link>
                    <Link onClick={() => handleDeleteBook(book.id)} className="btn btn-sm btn-danger mb-2">
                      Delete Book
                    </Link>
                  </div>
                )
              }



                {user.data?.user_type === 'CUSTOMER' && 
                <button onClick={() => handleReserveBook(book.id,book.quantity,book.title)} className="btn btn-sm btn-success mb-2">Reserve Book</button>}
              </td>
            </tr>
          ))}
          {allBooks?.loading && (
            <tr>
              <td colSpan="3" className="text-center">
                <span className="spinner-border spinner-border-lg align-center"></span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
