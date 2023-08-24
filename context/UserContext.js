import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    if (session) {
      setToken(session.user.token);
      setUser(session.user.user);
      // console.log(session.user.user)
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ token, user }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContext");
  }
  return context;
}
