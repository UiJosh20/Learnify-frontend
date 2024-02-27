import * as yup from 'yup';

export const adminLoginSchema = yup.object({
    adminId: yup.string().max(9, 'Matric Number must not exceed 9 characters').required("required"),
    password: yup.string().required('Password is required'),
});