'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import UsersForm, { CreateUserType } from "../_components/UsersForm";
import { createUser } from "../_components/actions";

export default function UsersCreate() {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: CreateUserType) => {
    try {
      setSubmitted(true);
      
      await createUser(values);
      
      notification.success({ message: 'Success!', description: 'User was created.' });
      router.push('/users/manage');
    } catch (error) {
      console.log(error);
      notification.error({ message: 'Oops!', description: 'Something went wrong.' });
      setSubmitted(false);
    }
  };

  return (
    <UsersForm onSubmit={onSubmit} submitted={submitted} />
  )
}
