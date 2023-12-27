'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Button } from 'antd';
import UsersManageTable from '../(components)/UsersManageTable';

export default function UsersManage() {
  const router = useRouter();

  const onCreateClick = () => router.push('/users/create');
  return (
    <>
      <Flex className='mb-2' justify='end'>
        <Button size='small' shape='round' onClick={onCreateClick}>
          Create
        </Button>
      </Flex>
      <UsersManageTable  />
    </>
    
  )
}
