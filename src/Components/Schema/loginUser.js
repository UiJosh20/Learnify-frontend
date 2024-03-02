import * as yup from 'yup';

export const userLoginSchema = yup.object({
    matricNumber: yup.string().max(13, 'Matric Number must not exceed 13 characters')
    .matches(/[A-Za-z]{2}$/, 'Matric Number must end with two alphabets')
    .required('Matric Number is required'),

    password: yup.string().required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});