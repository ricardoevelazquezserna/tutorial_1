'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Button, Typography } from 'antd';
import UsersManageTable from '../(components)/UsersManageTable';

const { Title } = Typography;

export default function UsersManage() {
  const router = useRouter();

  const onCreateClick = () => router.push('/users/create');

  return (
    <>
      <Flex className='mb-2' align='center' justify='space-between'>
        <Title level={2} style={{ marginBottom: '0'}}>
          Users
        </Title>
        <Button size='small' shape='round' onClick={onCreateClick}>
          Create
        </Button>
      </Flex>
      <UsersManageTable  />
    </>
    
  )
}
