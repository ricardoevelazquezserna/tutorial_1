import { redirect } from "next/navigation";

export default async function Users() {
  redirect('/users/manage');
}
