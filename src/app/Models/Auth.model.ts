export interface AuthResponseData {
  status: string;
  token: string;
  data: {
    user: User;
  };
}
export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_digest: string;
  token?: string;
  expirationDate?: string;
}
