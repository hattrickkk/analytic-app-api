export interface User {
  id: number;
  email: string | null;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean | null;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface PositionResponse {
  name: string;
  code: string | null;
}

export interface TeacherResponse {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  rate: number;
  position: PositionResponse;
}

export interface UserResponse extends UserWithPassword {
  teacher: TeacherResponse | null;
}
