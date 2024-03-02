import * as yup from 'yup';

export const adminLoginSchema = yup.object({
    adminId: yup.string().matches(/^admin\d{4}$/, 'Admin ID must start with "admin" and must not be more than 9 characters').required("Admin ID is required"),
    password: yup.string().required('Password is required'),
});