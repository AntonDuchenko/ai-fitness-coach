export interface User {
  id: string;
  email: string;
  name: string | null;
  isPremium: boolean;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

export interface AuthFormFields {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

export interface AuthFormErrors {
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
  agreedToTerms?: string;
  server?: string;
}

export interface PasswordRequirement {
  label: string;
  met: boolean;
}

export interface PasswordStrengthResult {
  score: number;
  requirements: PasswordRequirement[];
}
