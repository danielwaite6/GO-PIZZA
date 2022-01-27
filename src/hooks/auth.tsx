import React, { createContext, useContext, useState, ReactNode } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';


type AuthContextData = {
    signIn: (email: string, password: string) => Promise<void>;
    isLogging: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

    const [isLogging, setIsLogging] = useState(false);

    async function signIn(email: string, password: string) {
        Alert.alert('Login', email)
        if (!email || !password) {
            return Alert.alert('Login', 'Informe e-mail e senha.')
        }
        setIsLogging(true);

        auth().signInWithEmailAndPassword(email, password)
            .then((account) => {
                console.log('account: ', account);
            })
            .catch((err) => {
                const { code } = err;
                if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
                    return Alert.alert('Login', 'E-mail e/ou senha inválidos.')
                } else {
                    return Alert.alert('Login', 'Não foi possível realizar o Login.')
                }
            })
            .finally(() => setIsLogging(false));
    }

    return (
        <AuthContext.Provider value={{ signIn, isLogging }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };