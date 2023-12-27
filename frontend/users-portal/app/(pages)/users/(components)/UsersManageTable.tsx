import React, { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { ActionButton, CustomTable } from '@/components';
import { deleteUser, getUsers } from './actions';
import { notification } from 'antd';

type DataType = {
  id: string;
  name: string;
  middleName?: string;
  lastName: string;
  email: string;
}

export default function UsersManageTable() {
  const [refresh, setRefresh] = useState(false);

  const onSuccess = () => {
    setRefresh(true);
    notification.success({ message: 'Success!', description: 'User was deleted.' });
  }

  const onError = () => {
    notification.error({ message: 'Oops!', description: 'User cannot be deleted.' })
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Middle Name',
      dataIndex: 'middleName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: '',
      dataIndex: 'id',
      width: 100,
      render: (value) => (
        <ActionButton
          buttonText='Delete'
          onConfirm={async () => await deleteUser(value)}
          onSuccess={onSuccess}
          onError={onError}
        />
      )
    },
  ];

  return (
    <CustomTable
      columns={columns}
      onChange={getUsers}
      needRefresh={refresh}
      rowKey={'id'}
    />
  )
}
