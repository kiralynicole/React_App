import { createContext, useContext, useState } from 'react';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface NullableAuthObject {
  accessToken: null | string;
  user: null | User;
}

interface AuthContextValue extends NullableAuthObject {
  login: (data: NonNullable<NullableAuthObject>) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

const initialValue = {
  accessToken: null,
  user: null,
};
export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useState<NullableAuthObject>(() => {
    const fromStorage = localStorage.getItem('auth');
    if (fromStorage) {
      return JSON.parse(fromStorage);
    }
    return initialValue;
  });

  function login(data: NonNullable<NullableAuthObject>) {
    localStorage.setItem('auth', JSON.stringify(data));
    setAuth(data);
  }

  function logout() {
    localStorage.removeItem('auth');
    setAuth(initialValue);
  }

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error(
      'Please use "useAuthContext" only inside children of the "AuthContextProvider" component.'
    );
  }
  return ctx;
}
