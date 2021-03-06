import React, {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect
} from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


type User = {
    id: string;
    name: string;
    isAdmin: boolean;
}

type AuthContextData = {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    isLogging: boolean;
    user: User | null;
};

type AuthProviderProps = {
    children: ReactNode;
}

const USER_COLLECTION = '@gopizzas:users';

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLogging, setIsLogging] = useState(false);

    async function signIn(email: string, password: string) {
        if (!email || !password) {
            return Alert.alert("Login", "Informe o e-mail e a senha.");
        }

        setIsLogging(true);

        auth()
            .signInWithEmailAndPassword(email, password)
            .then((account) => {

                firestore()
                    .collection("users")
                    .doc(account.user.uid)
                    .get()
                    .then(async (profile) => {
                        const { name, isAdmin } = profile.data() as User;

                        if (profile.exists) {
                            const userData = {
                                id: account.user.uid,
                                name,
                                isAdmin,
                            };

                            await AsyncStorage.setItem(
                                USER_COLLECTION,
                                JSON.stringify(userData)
                            );
                            setUser(userData);
                        }
                    })
                    .catch(() =>
                        Alert.alert(
                            "Login",
                            "N??o foi poss??vel buscar os dados de perfil do usu??rio."
                        )
                    );
            })
            .catch((error) => {
                const { code } = error;

                if (code === "auth/user-not-found" || code === "auth/wrong-password") {
                    return Alert.alert("Login", "E-mail e/ou senha inv??lida.");
                } else {
                    return Alert.alert("Login", "N??o foi poss??vel realizar o login.");
                }
            })
            .finally(() => setIsLogging(false));
    }


    async function loadUserStorageData() {
        setIsLogging(true);

        const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

        if (storedUser) {
            const userData = JSON.parse(storedUser) as User;

            setUser(userData);
        }

        setIsLogging(false);
    }

    async function signOut() {
        await auth().signOut();
        await AsyncStorage.removeItem(USER_COLLECTION);
        setUser(null);
    }

    async function forgotPassword(email: string) {
        if (!email) {
            return Alert.alert("Redefinir Senha", "Informe o e-mail.");
        }

        auth()
            .sendPasswordResetEmail(email)
            .then(() =>
                Alert.alert(
                    "Redefinir Senha",
                    "Enviamos um link no seu e-mail para voc?? redefinir sua senha."
                )
            )
            .catch(() =>
                Alert.alert(
                    "Redefinir Senha",
                    "N??o foi poss??vel enviar o e-mail para redefini????o da senha."
                )
            );
    }


    useEffect(() => {
        loadUserStorageData();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signOut,
                isLogging,
                forgotPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };



































/**import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
    id: string;
    name: string;
    isAdmin: boolean;
}

type AuthContextData = {
    signIn: (email: string, password: string) => Promise<void>;
    isLogging: boolean;
    user: User | null;
}

type AuthProviderProps = {
    children: ReactNode;
}

const USER_COLLECTION = '@gopizza:users';





export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

    const [usersLogging, setUser] = useState<User | null>(null);
    const [isLogging, setIsLogging] = useState(false);

    async function signIn(email: string, password: string) {

        if (!email || !password) {
            return Alert.alert('Login', 'Informe e-mail e senha.')
        }
        setIsLogging(true);

        auth().signInWithEmailAndPassword(email, password)
            .then((account) => {
                //console.log('account: ', account);
                firestore()
                    .collection('users')
                    .doc(account.user.uid)
                    .get()
                    .then((profile) => {
                        const { name, isAdmin } = profile.data() as User;
                        if (profile.exists) {
                            const userData = {
                                id: account.user.uid,
                                name,
                                isAdmin,
                            }
                            console.log(userData);

                            setUser(userData);
                        }
                    })
                    .catch(() => Alert.alert('Login', 'N??o foi possivel buscar os dados de perfil do usuario.'))
            })
            .catch((err) => {
                const { code } = err;
                if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
                    return Alert.alert('Login', 'E-mail e/ou senha inv??lidos.')
                } else {
                    return Alert.alert('Login', 'N??o foi poss??vel realizar o Login.')
                }
            })
            .finally(() => setIsLogging(false));
    }

    return (
        <AuthContext.Provider value={{ signIn, isLogging, user }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }; */