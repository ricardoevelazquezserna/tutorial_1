'use server'

import { RequestOptions, fetchRequest } from "@/lib/fetch";
import { CreateUserType } from "./UsersForm";

export async function getUsers(queryParams: string | null = null) {
  const url = queryParams ? `users${queryParams}` : 'users';
  return await fetchRequest(url);
}

export async function createUser(payload: CreateUserType) {
  const url = 'users';
  const options: RequestOptions = {
    method: 'POST',
    body: payload
  };

  return await fetchRequest(url, options);
}