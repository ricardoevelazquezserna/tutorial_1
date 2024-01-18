'use client'

import React, { useEffect, useState } from 'react';
import { Table, notification } from 'antd';
import type { TableProps } from 'antd/es/table';
import { SizeType } from 'antd/es/config-provider/SizeContext';

const DEFAULT_PAGINATION = {
  total: 0,
  pageSize: 10,
  showSizeChanger: true,
}

type CustomTableProps = {
  columns: any[];
  onChange: (queryParams: string | null) => Promise<any>;
  rowKey?: string;
  size?: SizeType;
  refreshKey?: string;
  onRowClick?: (record: any, index: number | undefined) => any;
}

export default function CustomTable(props: CustomTableProps) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [queryParams, setQueryParams] = useState('');

  const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
    let params = [];

    if (pagination) {
      const { current = 1, pageSize = 10 } = pagination;
      const offset = (current * pageSize) - pageSize;
      params.push(`offset=${offset}`);
      params.push(`limit=${pageSize}`);
    }

    if (sorter) {
      const { field = '', order = 'ascend' } = sorter;
      const param = field && order == 'ascend' ? `${field}` : `-${field}`;
      if (field) params.push(`sort=${param}`);
    }

    const queryParams = `?${params.join('&')}`;

    setQueryParams(queryParams);
    getItems(queryParams);
  };

  const getItems = async (queryParams: string | null = null) => {
    try {
      setLoading(true);

      const response = await props.onChange(queryParams);

      setItems(response.items);
      setPagination({ total: response.total, pageSize: response.limit, showSizeChanger: true });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setItems([]);
      notification.error({ message: 'Oops!', description: 'Something went wrong.' });
    }
  }

  const onRowClick = (record: any, index: number | undefined) => {
    if (props.onRowClick) props.onRowClick(record, index);
  }

  const onRow = (record: any, index: number | undefined) => {
    return {
      onDoubleClick: (event: any) => onRowClick(record, index),
    }
  }

  useEffect(() => { if (props) getItems(); }, []);

  useEffect(
    () => { 
      if (props && props.refreshKey) {
        getItems(queryParams);
      }
    },
    [props]
  );

  return (
    <Table
      columns={props.columns || []}
      dataSource={items}
      onChange={onChange}
      size={props.size || 'middle'}
      rowKey={props.rowKey || 'id'}
      loading={loading}
      pagination={pagination}
      onRow={onRow}
      rowClassName={'cursor-pointer'}
    />
  )
}
