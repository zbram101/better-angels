import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { history } from '_helpers';
import { Nav, Alert, PrivateRoute } from '_components';
import { Home } from 'features/home';
import { AccountLayout } from 'features/account';
import { UsersLayout } from 'features/users';
import { BooksLayout } from 'features/books';

export { App };

function App() {
    // init custom history object to allow navigation from 
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div className="app-container bg-light">
            <Nav />
            <Alert />
            <div className="container pt-4 pb-4">
                <Routes>
                    {/* private */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="users/*" element={<UsersLayout />} />
                        <Route path="books/*" element={<BooksLayout />} />
                    </Route>
                    {/* public */}
                    <Route path="/*" element={<AccountLayout />} />
                </Routes>
            </div>
        </div>
    );
}
