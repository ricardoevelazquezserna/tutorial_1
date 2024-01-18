import UsersDetails from "../_components/UsersDetails";
import { getUser } from "../_components/actions";

type UsersDetailsParams = {
  params: {
    id: string;
  }
}

export default async function User({ params }: UsersDetailsParams) {
  const user = await getUser(params.id);

  return (
    <UsersDetails user={user} />
  )
}
