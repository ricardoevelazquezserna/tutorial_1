'use server'

import { RequestOptions, fetchRequest } from "@/lib/fetch";
import { UserPayload } from "./UsersForm";

export interface User {
  name: string;
  lastName: string;
  middleName?: string | undefined;
  email: string;
  birthDate: string;
  status: string;
  lastSessionAt: string | null,
  createdAt: string;
  updatedAt: string;
  id: string;
}

export async function getUsers(queryParams: string | null = null) {
  const url = queryParams ? `users${queryParams}` : 'users';
  return await fetchRequest(url);
}

export async function getUser(id: string): Promise<User> {
  const url = `users/${id}`;
  return await fetchRequest(url);
}

export async function createUser(payload: UserPayload) {
  const url = 'users';
  const options: RequestOptions = {
    method: 'POST',
    body: payload
  };

  return await fetchRequest(url, options);
}

export async function updateUser(id: string, payload: UserPayload) {
  const url = `users/${id}`;
  const options: RequestOptions = {
    method: 'PUT',
    body: payload
  };

  return await fetchRequest(url, options);
}

export async function deleteUser(id: string) {
  const url = `users/${id}`;
  const options: RequestOptions = { method: 'DELETE' };
  return await fetchRequest(url, options);
}