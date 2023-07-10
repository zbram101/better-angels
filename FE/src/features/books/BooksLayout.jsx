import { Routes, Route } from 'react-router-dom';

import { AllBooks, AddEdit } from '.';

export { BooksLayout };

function BooksLayout() {
    return (
        <div className="p-4">
            <div className="container">
                <Routes>
                    <Route index element={<AllBooks />} />
                    <Route path="addEdit" element={<AddEdit />} />
                    <Route path="addEdit/:id" element={<AddEdit />} />
                </Routes>
            </div>
        </div>
    );
}
