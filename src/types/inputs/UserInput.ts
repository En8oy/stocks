export interface CreateUserInput {
  email: string;
  first_name: string;
  last_name?: string;
  phone?: string;
  password: string;
  language_setting?: string;
  timezone?: string;
}

export interface UpdateUserInput {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  language_setting?: string;
  timezone?: string;
  is_active?: boolean;
}