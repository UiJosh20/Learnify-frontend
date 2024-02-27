import * as yup from 'yup';

export const userLoginSchema = yup.object({
    matricNumber: yup.string().max(13, 'Matric Number must not exceed 13 characters').required("required"),
    password: yup.string().required('Password is required'),
});