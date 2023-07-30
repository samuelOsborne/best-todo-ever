import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { AuthError, AuthResponse, Session, SignUpWithPasswordCredentials, User, createClient } from "@supabase/supabase-js";

const AuthContext = createContext({} as AuthProviderValue);

export function useAuth() {
  return useContext<AuthProviderValue>(AuthContext)
}

export interface AuthProviderProps {
  children: string | JSX.Element | JSX.Element[]
}

export interface AuthProviderValue {
  signUp: (data: SignUpWithPasswordCredentials) => Promise<AuthResponse>,
  logIn: (data: SignUpWithPasswordCredentials) => Promise<AuthResponse>,
  signOut: () => Promise<{ error: AuthError | null }>,
  user: User | null | undefined
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [, setSession] = useState<Session | null>()
  const [user, setUser] = useState<User | null>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const gotSession = localStorage.getItem("authSession")

    if (gotSession) {
      setSession(JSON.parse(gotSession))
      setUser(JSON.parse(gotSession))
    }

    async function getSession() {
      setLoading(false);

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session: Session | null) => {
          if (session) {
            console.log("New session: ", session)
            setUser(session.user)
            localStorage.setItem("authSession", JSON.stringify(session))
            setSession(session)
          } else {
            localStorage.removeItem("authSession")
            setSession(null)
            setUser(null)
          }
          setLoading(false)
        }
      )
      return () => {
        subscription?.unsubscribe()
      }
    }
    getSession()
  }, [])

  const value = {
    signUp: async (data: SignUpWithPasswordCredentials) => supabase.auth.signUp(data),
    logIn: (data: SignUpWithPasswordCredentials) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    user,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}