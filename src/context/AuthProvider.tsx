import { createContext, ReactNode, useState } from "react";

type Props = {
    children: ReactNode
}

interface AuthContextInterface {
    auth: {
        id?: string;
        firstName?: string;
        username?: string;
        bestScore?: number;
    }
    setAuth: React.Dispatch<React.SetStateAction<object>>;
}

type AuthType = {
    id?: string;
    firstName?: string;
    username?: string;
    bestScore?: number;
  }

const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const AuthProvider = ({children}: Props) => {
    const [auth, setAuth] = useState<AuthType>({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;