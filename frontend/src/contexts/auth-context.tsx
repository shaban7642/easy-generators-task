/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useReducer } from 'react';
import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { authApi } from '../api/authApi';
import type { User } from '../types/user';

interface State {
    isInitialized: boolean;
    isAuthenticated: boolean;
    user: User | null;
}

export interface AuthContextValue extends State {
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, name: string, password: string) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

enum ActionType {
    INITIALIZE = 'INITIALIZE',
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
}

type InitializeAction = {
    type: ActionType.INITIALIZE;
    payload: {
        isAuthenticated: boolean;
        user: User | null;
    };
};

type LoginAction = {
    type: ActionType.LOGIN;
    payload: {
        user: User;
    };
};

type RegisterAction = {
    type: ActionType.REGISTER;
    payload: {
        isAuthenticated: boolean;
        user: User;
    };
};

type Action = InitializeAction | LoginAction | RegisterAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
    isAuthenticated: false,
    isInitialized: false,
    user: {
        name: '',
        email: '',
    },
};

const handlers: Record<ActionType, Handler> = {
    INITIALIZE: (state: State, action: InitializeAction): State => {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },

    LOGIN: (state: State, action: LoginAction): State => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },

    REGISTER: (state: State, action: RegisterAction): State => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
};

const reducer = (state: State, action: Action): State =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext<AuthContextValue>({
    ...initialState,
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    const login = async (email: string, password: string): Promise<any> => {
        const { data } = await authApi.login({ email, password });
        dispatch({
            type: ActionType.INITIALIZE,
            payload: {
                user: data.user,
                isAuthenticated: true,
            },
        });
        return data;
    };

    const register = async (
        name: string,
        email: string,
        password: string
    ): Promise<any> => {
        const { data } = await authApi.signup({ name, email, password });

        dispatch({
            type: ActionType.REGISTER,
            payload: {
                user: data.user,
                isAuthenticated: true,
            },
        });
        return data;
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
