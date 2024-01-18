'use client'

import UsersUpdate from "../[id]/update/page";
import { User } from "./actions";

type UserDetailsProps = {
  user: User
}

export default function UsersDetails({ user }: UserDetailsProps) {

  return (
    <UsersUpdate params={{ user }}/>
  )
}