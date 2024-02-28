import * as yup from 'yup';

export const verifySchema = yup.object({
    otp: yup.string()
        .required('Please enter OTP')
        .matches(/^\d{6}$/, 'OTP must be exactly 6 digits')
});
