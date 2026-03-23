"use client";

import { apiClient } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo } from "react";
import type { AuthContextType, AuthResponse, User } from "../types";

const TOKEN_KEY = "auth_token";

export const AuthContext = createContext<AuthContextType | null>(null);

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function useAuthProvider(): AuthContextType {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user = null, isLoading } = useQuery<User | null>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      if (!getToken()) return null;
      try {
        return await apiClient<User>("/auth/me");
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        return null;
      }
    },
  });

  const loginMutation = useMutation({
    mutationFn: (vars: { email: string; password: string }) =>
      apiClient<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(vars),
      }),
    onSuccess: (data) => {
      localStorage.setItem(TOKEN_KEY, data.accessToken);
      queryClient.setQueryData(["auth", "me"], data.user);
      router.push("/dashboard");
    },
  });

  const signupMutation = useMutation({
    mutationFn: (vars: { email: string; password: string; name?: string }) =>
      apiClient<AuthResponse>("/auth/signup", {
        method: "POST",
        body: JSON.stringify(vars),
      }),
    onSuccess: (data) => {
      localStorage.setItem(TOKEN_KEY, data.accessToken);
      queryClient.setQueryData(["auth", "me"], data.user);
      router.push("/dashboard");
    },
  });

  const login = useCallback(
    async (email: string, password: string) => {
      await loginMutation.mutateAsync({ email, password });
    },
    [loginMutation],
  );

  const signup = useCallback(
    async (email: string, password: string, name?: string) => {
      await signupMutation.mutateAsync({
        email,
        password,
        name: name || undefined,
      });
    },
    [signupMutation],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    queryClient.setQueryData(["auth", "me"], null);
    queryClient.clear();
    router.push("/login");
  }, [queryClient, router]);

  const isAuthenticated = user !== null;

  return useMemo(
    () => ({ user, isLoading, isAuthenticated, login, signup, logout }),
    [user, isLoading, isAuthenticated, login, signup, logout],
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
