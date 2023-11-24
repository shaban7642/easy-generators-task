import { Box, Card, Container, Divider, Link, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LoginForm } from '../../../components/auth/login-form';

const LoginPage = () => {
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
                        <Typography variant='h4'>Login</Typography>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            mt: 3,
                        }}
                    >
                        <LoginForm />
                    </Box>

                    <Divider sx={{ my: 3 }} />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <NavLink to={'/signup'}>
                                <Link color='textSecondary' variant='body2'>
                                    Create new account?
                                </Link>
                            </NavLink>
                        </div>
                    </Box>
                </Card>
            </Container>
        </Box>
    );
};

export default LoginPage;
