import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { history } from '_helpers';
import { bookActions, alertActions } from '_store';

export { AddEdit };

function AddEdit() {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const dispatch = useDispatch();

    const genreOptions = ['FICTION', 'FOLKLORE', 'FAIRY_TALE'];

    // // form validation rules 
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        isbn: Yup.string()
            .required('isbn is required'),
        author: Yup.string()
            .required('Author is required'),
        genre: Yup.string(),
        quantity: Yup.number()
            .required('quantity is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        if (id) {
            setTitle('Edit Book');
            // fetch book details into redux state and 
            // populate form fields with reset()
            dispatch(bookActions.getById(id)).unwrap()
                .then(book => {reset(book.data)});
        } else {
            setTitle('Add Book');
        }
    }, []);

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            // create or update book based on id param
            let message;
            if (id) {
                await dispatch(bookActions.update({ id, data })).unwrap();
                message = 'Book updated';
            } else {
                await dispatch(bookActions.add(data)).unwrap();
                message = 'Book added';
            }

            // redirect to book list with success message
            history.navigate('/books');
            dispatch(alertActions.success({ message, showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <>
            <h1>{title}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Title</label>
                            <input name="title" type="text" {...register('title')} className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.title?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">ISBN</label>
                            <input name="isbn" type="text" {...register('isbn')} className={`form-control ${errors.isbn ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.isbn?.message}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Author</label>
                            <input name="author" type="text" {...register('author')} className={`form-control ${errors.author ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.author?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Genre</label>
                            <select name="genre" {...register('genre')} className={`form-control ${errors.genre ? 'is-invalid' : ''}`}>
                                <option value="">Select Genre</option>
                                {genreOptions.map((genre) => (
                                    <option key={genre} value={genre}>
                                        {genre}
                                    </option>
                                ))}
                            </select>
                            <div className="invalid-feedback">{errors.genre?.message}</div>
                        </div>

                        <div className="mb-3 col">
                            <label className="form-label">Quantity</label>
                            <input name="quantity" type="text" {...register('quantity')} className={`form-control ${errors.quantity ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.quantity?.message}</div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary me-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset()} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                        <Link to="/books" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
        </>
    );
}
