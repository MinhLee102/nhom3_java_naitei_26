export interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
  role: "USER" | "ADMIN";
}

export interface UpdateUserDto {
  name?: string;
  role?: "USER" | "ADMIN";
  isActive?: boolean;
}
