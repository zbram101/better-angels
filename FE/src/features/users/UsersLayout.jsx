import { Routes, Route } from 'react-router-dom';

import { List } from '.';

export { UsersLayout };

function UsersLayout() {
    return (
        <div className="p-4">
            <div className="container">
                <Routes>
                    <Route index element={<List />} />
                </Routes>
            </div>
        </div>
    );
}
