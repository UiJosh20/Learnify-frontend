import * as yup from 'yup'

export const loginSchema = yup.object({
    firstName: yup.string().required('First name is required').max(10).min(4, 'First name must be between 4 and 10 characters'),
    lastName: yup.string().required('last name is required').max(10).min(4, 'Last name must be between 4 and 10 characters'),
    email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').matches(/[^a-zA-Z0-9]{8,}$/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),

})