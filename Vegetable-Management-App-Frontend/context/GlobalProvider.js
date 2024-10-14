import { createContext, useContext, useEffect, useState } from "react";
import { request } from "../lib/Require";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    async () => {
      const res = await request("authentication", "get");
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
    };
  });

  return (
    <GlobalContext.Provider value={{ user, setUser,accessToken,setAccessToken }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
