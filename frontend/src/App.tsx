import { StrictMode } from 'react';
import { createBrowserHistory } from 'history';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import AppRouter from './routes/AppRouter';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/auth/login/index';
import SignUpPage from './pages/auth/signup/index';
import { HomePage } from './pages/home';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />,
    },
    {
        path: '/signup',
        element: <SignUpPage />,
    },
    {
        path: '/home',
        element: <HomePage />,
    },
]);

export const history = createBrowserHistory();

function App() {
    return (
        <StrictMode>
            <RouterProvider router={router} />
            <Toaster
                toastOptions={{
                    duration: 6000,
                }}
            />
        </StrictMode>
    );
}

export default App;
