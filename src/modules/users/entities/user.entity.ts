export interface User {
  id: number;
  email: string | null;
  username: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithPassword extends User {
  password: string;
}
