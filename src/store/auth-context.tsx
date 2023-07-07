import { ReactNode, createContext, useState } from "react";
import { AuthData } from "./models/authdata";

interface AuthContextType {
  authdata: AuthData;
  addDataHandler: (data: any) => void;
}
interface Props {
  children?: ReactNode
  // any props that come into the component
}
export const AuthContext = createContext<AuthContextType>({
  authdata: { token: '', user: { id: 0, name: '', email: '', roleid: 0 } },
  addDataHandler: (data: any) => { },
});


export function AuthProvider({ children }: Props) {
  const [mydata, setMydata] = useState<AuthData>({ token: '', user: { id: 0, name: '', email: '', roleid: 0 } });

  function addDataHandler(data: AuthData) {
    setMydata(data);
  }

  const context: any = {
    authdata: mydata,
    addDataHandler: addDataHandler
  }
  return (

    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>

  );
}

