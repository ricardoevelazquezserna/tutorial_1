'use server'

import { fetchRequest } from "@/lib/fetch";

export async function getUsers(queryParams: string | null = null) {
  const url = queryParams ? `users${queryParams}` : 'users';
  return await fetchRequest(url);
}