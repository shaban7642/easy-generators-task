import { Box, Card, Container, Divider, Link, Typography } from '@mui/material';
import React from 'react';
import { RegisterForm } from '../../../components/auth/register-form';
import { NavLink } from 'react-router-dom';

const SignUpPage = () => {
    return (
        <Box
            component='main'
            sx={{
                backgroundColor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Container
                maxWidth='sm'
                sx={{
                    py: {
                        xs: '60px',
                        md: '120px',
                    },
                }}
            >
                <Card elevation={16} sx={{ p: 4, backgroundColor: '#FFF' }}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant='h4'>Sign Up</Typography>
                        <Typography
                            color='textSecondary'
                            sx={{ mt: 2 }}
                            variant='body2'
                        >
                            Create a new account
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            mt: 3,
                        }}
                    >
                        <RegisterForm />
                    </Box>
                    <Divider sx={{ my: 3 }} />
                    <div>
                        <NavLink to={'/'}>
                            <Link color='textSecondary' variant='body2'>
                                already have an account?
                            </Link>
                        </NavLink>
                    </div>
                </Card>
            </Container>
        </Box>
    );
};

export default SignUpPage;
