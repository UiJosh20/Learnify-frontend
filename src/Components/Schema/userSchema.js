import * as yup from 'yup'

export const loginSchema = yup.object({
    firstName: yup.string().required('First name is required').max(10, 'Maximum length is 10 characters').min(4, 'First name must be between 4 and 10 characters'),
    lastName: yup.string().required('Last name is required').max(10, 'Maximum length is 10 characters').min(4, 'Last name must be between 4 and 10 characters'),
    email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/,
        "Password must be at least 8 characters long and contain both letters and numbers"
    )
});
