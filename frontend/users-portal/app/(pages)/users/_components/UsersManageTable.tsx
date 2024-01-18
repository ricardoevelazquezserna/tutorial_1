import React, { useState } from 'react';
import { notification } from 'antd';
import { ActionButton, CustomTable } from '@/components';
import { deleteUser, getUsers } from './actions';
import { getUniqueKey } from '@/lib/utils';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';

type DataType = {
  id: string;
  name: string;
  middleName?: string;
  lastName: string;
  email: string;
}

export default function UsersManageTable() {
  const [refreshKey, setRefreshKey] = useState('');
  const router = useRouter();

  const onSuccess = () => {
    const key = getUniqueKey();
    setRefreshKey(key);
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
      align: 'center',
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

  const onRowClick = (record: DataType, index: number | undefined) => {
    router.push(`/users/${record.id}`)

  }

  return (
    <CustomTable
      columns={columns}
      onChange={getUsers}
      onRowClick={onRowClick}
      refreshKey={refreshKey}
      rowKey={'id'}
    />
  )
}
