'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import UsersForm, { UserPayload } from "../../_components/UsersForm";
import { User, updateUser } from "../../_components/actions";

type UsersUpdateParams = {
  params: {
    user: User;
  }
}

export default function UsersUpdate({ params }: UsersUpdateParams) {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: UserPayload) => {
    try {
      setSubmitted(true);
      
      await updateUser(params.user.id, values);
      
      notification.success({ message: 'Success!', description: 'User was updated.' });
      router.push('/users/manage');
    } catch (error) {
      notification.error({ message: 'Oops!', description: 'Something went wrong.' });
      setSubmitted(false);
    }
  };

  return (
    <UsersForm onSubmit={onSubmit} submitted={submitted} user={params.user} />
  )
}
