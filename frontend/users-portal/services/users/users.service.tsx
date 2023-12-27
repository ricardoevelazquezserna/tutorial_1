import { fetchRequest } from "@/lib/fetch"

export const getUsers = async () => {
  try {
    const response = await fetchRequest(`users`);
    return response.json();
  } catch (error) {
    return Promise.resolve([]);
  }
}