import { useState } from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    Box,
    Button,
    FormHelperText,
    TextField,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { PasswordValidationForm } from './password-validation-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/use-auth';

export const RegisterForm: FC = (props) => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordValidation, setShowPasswordValidation] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            submit: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().max(255).required('name is required.'),
            email: Yup.string()
                .email('must be a valid email address')
                .max(255)
                .required('email is required.'),
            password: Yup.string()
                .min(7)
                .max(255)
                .required('password is required.'),
            confirmPassword: Yup.string().test(
                'passwords-match',
                'passwords should match',
                function (value) {
                    return this.parent.password === value;
                }
            ),
        }),
        onSubmit: async (values, helpers): Promise<void> => {
            try {
                const { name, email, password } = values;
                const data = await register(name, email, password);

                if (data.success) {
                    toast.success('signed up successfully!');
                    navigate('/home');
                } else {
                    toast.error('sign up failed!');
                }
            } catch (err: any) {
                // toast.error(err.response?.data?.error || 'signup failed');
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.response?.data?.error });
                helpers.setSubmitting(false);
            }
        },
    });

    const onFocus = () => {
        setShowPasswordValidation(true);
    };
    const onBlur = (e: any) => {
        formik.handleBlur(e);
        setShowPasswordValidation(false);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    return (
        <form noValidate onSubmit={formik.handleSubmit} {...props}>
            <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label={'Name'}
                margin='normal'
                name='name'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type='name'
                value={formik.values.name}
                InputProps={{
                    style: {
                        fontFamily: 'sans-serif',
                    },
                }}
            />
            <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label={'Email'}
                margin='normal'
                name='email'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type='email'
                value={formik.values.email}
                InputProps={{
                    style: {
                        fontFamily: 'sans-serif',
                    },
                }}
            />
            <FormControl
                sx={{ width: '100%', marginTop: '10px' }}
                variant='outlined'
            >
                <InputLabel htmlFor='outlined-adornment-password'>
                    Password
                </InputLabel>
                <OutlinedInput
                    error={Boolean(
                        formik.touched.password && formik.errors.password
                    )}
                    fullWidth
                    // helperText={formik.touched.password && formik.errors.password}
                    label={'Password'}
                    name='password'
                    onBlur={(e) => onBlur(e)}
                    onChange={formik.handleChange}
                    onFocus={onFocus}
                    value={formik.values.password}
                    type={showPassword ? 'text' : 'password'}
                    sx={{
                        fontFamily: 'sans-serif',
                    }}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label='toggle password visibility'
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge='end'
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {showPasswordValidation === true && (
                    <PasswordValidationForm
                        sx={{ bottom: '-180px' }}
                        password={formik.values.password}
                    />
                )}
            </FormControl>
            <TextField
                error={Boolean(
                    formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                )}
                fullWidth
                helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                }
                label={'Confirm Password'}
                margin='normal'
                name='confirmPassword'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={showPassword ? 'text' : 'password'}
                value={formik.values.confirmPassword}
                InputProps={{
                    style: {
                        fontFamily: 'sans-serif',
                    },
                }}
            />
            {formik.errors.submit && (
                <Box sx={{ mt: 3 }}>
                    <FormHelperText error>
                        {formik.errors.submit}
                    </FormHelperText>
                </Box>
            )}
            <Box sx={{ mt: 2 }}>
                <Button
                    disabled={formik.isSubmitting}
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                >
                    Sign Up
                </Button>
            </Box>
        </form>
    );
};
