import * as yup from 'yup';

export const createNewPassword = yup.object({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/,
        "Password must be at least 8 characters long and contain both letters and numbers"
    )
});
