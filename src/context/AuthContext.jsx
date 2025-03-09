import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(() => {
        // Retrieve session from local storage if it exists
        const savedSession = localStorage.getItem("supabaseSession");
        return savedSession ? JSON.parse(savedSession) : undefined;
    });

    // Signup
    const signUpNewUser = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            console.error("There was an error signing up: ", error);
            return { success: false, error };
        }

        return { success: true, data };
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) {
                localStorage.setItem("supabaseSession", JSON.stringify(session));
            }
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            console.log("Auth State changed");
            setSession(session);
            if (session) {
                localStorage.setItem("supabaseSession", JSON.stringify(session));
            } else {
                localStorage.removeItem("supabaseSession");
            }
            console.log(session);
        });
    }, []);

    const [isAdmin, setIsAdmin] = useState(false);

    const checkAdminStatus = async () => {
      try {
        // Call the SQL function isAdmin() using Supabase
        const { data, error } = await supabase
          .rpc('is_admin');
  
        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);  // Ensure it defaults to false if there’s an error
        } else {
          setIsAdmin(data);  // The returned result of the isAdmin function
        }
      } catch (err) {
        console.error('Error calling isAdmin function:', err);
        setIsAdmin(false);  // Default to false if an error occurs
      } finally {
        console.log('Admin status checked: ', isAdmin);
      }
    };

    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                console.error("There was an error signing in: ", error);
                return { success: false, error: error.message };
            }

            console.log("Sign in success: ", data);
            checkAdminStatus();
            return { success: true, data };
        } catch (error) {
            console.error("There was an error signing in: ", error);
        }
    };

    // Signout
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("There was an error signing out: ", error);
        } else {
            setSession(undefined);
            localStorage.removeItem("supabaseSession");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                session,
                signUpNewUser,
                signOut,
                signInUser,
                isAdmin,
                checkAdminStatus
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};