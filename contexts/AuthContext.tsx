import { router, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { loadUser, login, logout, register } from "../services/AuthService";
import { getToken } from "../services/TokenService";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  is_admin: boolean;
}

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    user: User | null;
  };
  onUser?: () => Promise<any>;
  onRegister?: (
    name: string,
    username: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => Promise<any>;
  onLogin?: (username: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

export const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    user: User | null;
    token: string | null;
    authenticated: boolean | null;
  }>({ user: null, token: null, authenticated: null });
  const [justRegistered, setJustRegistered] = useState<boolean>(false);

  const segments = useSegments();

  useEffect(() => {
    const InitializeToken = async () => {
      const token = await getToken();
      if (token !== null && token !== undefined) {
        setAuthState({ user: null, token, authenticated: true });
      } else {
        setAuthState({ user: null, token: null, authenticated: false });
      }
    };
    InitializeToken();
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!authState.authenticated && !inAuthGroup) {
      // Redirect to the sign-in page.
      router.replace("/(auth)/login");
    } else if (authState.authenticated && inAuthGroup) {
      // Redirect away from the sign-in page.
      if (justRegistered) {
        setJustRegistered(false);
        router.replace("/(onboard)/welcome");
      } else {
        router.replace("/(tabs)/home");
      }
    }
  }, [authState, segments]);

  // services/AuthService.ts

  // loadUser, login, register, logout
  const onUser = async () => {
    try {
      const user = await loadUser();
      console.log("load user", user);
      setAuthState({ user, token: authState.token, authenticated: true });
    } catch (error: any) {
      return error.response.data;
    }
  };

  const onRegister = async (
    name: string,
    username: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    try {
      await register({
        name,
        username,
        email,
        password,
        password_confirmation,
      });
      const user = await loadUser();
      setJustRegistered(true);
      setAuthState({ user: user, token: authState.token, authenticated: true });
    } catch (error: any) {
      return error.response.data;
    }
  };

  const onLogin = async (username: string, password: string) => {
    try {
      await login({ username, password });
      const user = await loadUser();
      console.log("user from login", user);
      setAuthState({ user: user, token: authState.token, authenticated: true });
    } catch (error: any) {
      return error.response.data;
    }
  };

  const onLogout = async () => {
    try {
      await logout();
      setAuthState({ user: null, token: null, authenticated: false });
    } catch (error: any) {
      return error.response.data;
    }
  };

  const value = {
    authState,
    onUser,
    onRegister,
    onLogin,
    onLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
