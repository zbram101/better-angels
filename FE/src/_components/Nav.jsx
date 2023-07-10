import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '_store';

export { Nav };

function Nav() {
    const auth = useSelector(x => x.auth.value);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    const userName = auth?.data?.name;

    // only show nav when logged in
    if (!auth) return null;
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                {(auth.data?.user_type === 'LIBRARIAN' || auth.data?.user_type === 'ADMIN') && <NavLink to="/users" className="nav-item nav-link">Users</NavLink>}
                <NavLink to="/books" className="nav-item nav-link">Books</NavLink>
                <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>
                {/* <NavLink to="/books" className="nav-item ms-auto text-white">Books</NavLink> */}
                <span className="nav-item nav-link text-white">Current User: {userName}</span>
            </div>
        </nav>
    );
}