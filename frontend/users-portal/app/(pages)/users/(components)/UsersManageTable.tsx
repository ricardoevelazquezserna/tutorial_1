import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import { CustomTable } from '@/components';
import { getUsers } from './actions';

type DataType = {
  id: string;
  name: string;
  middleName?: string;
  lastName: string;
  email: string;
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
];

export default function UsersManageTable() {

  return (
    <CustomTable
      columns={columns}
      onChange={getUsers}
      rowKey={'id'}
    />
  )
}
