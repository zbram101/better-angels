import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { authActions, alertActions } from '_store';

export { Register };
function Register() {
    const dispatch = useDispatch();

    // Form validation rules
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        user_type: Yup.string().required('User Type is required'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // Get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            const sendData = {
                name: data.name,
                email: data.username,
                password: data.password,
                user_type: data.user_type,
            };

            await dispatch(authActions.register(sendData)).unwrap();
            dispatch(alertActions.success({ message: 'Registration successful', showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <div className="card m-3">
            <h4 className="card-header">Register</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            name="name"
                            type="text"
                            {...register('name')}
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.name?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            name="username"
                            type="text"
                            {...register('username')}
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            name="password"
                            type="password"
                            {...register('password')}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">User Type</label>
                        <select
                            name="user_type"
                            {...register('user_type')}
                            className={`form-select ${errors.user_type ? 'is-invalid' : ''}`}
                        >
                            <option value="">Select User Type</option>
                            <option value="LIBRARIAN">LIBRARIAN</option>
                            <option value="CUSTOMER">CUSTOMER</option>
                        </select>
                        <div className="invalid-feedback">{errors.user_type?.message}</div>
                    </div>
                    <button disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Register
                    </button>
                    <Link to="../login" className="btn btn-link">Cancel</Link>
                </form>
            </div>
        </div>
    );
}
