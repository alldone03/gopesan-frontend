interface user{
  id: number;
  roleid: number;
  name: string;
  email: string;
  pathuserpicture?: string;
}


export interface AuthData {
  token: string;
  user: user;
}

