import React, { useState } from 'react';
import { Button, message, Popconfirm } from 'antd';
import { RequestOptions } from '@/lib/fetch';

type ActionButtonType = {
  title?: string;
  description?: string;
  placement?: 'leftBottom' | 'left' | 'leftTop' | 'topLeft' | 'top' | 'topRight';
  okText?: string;
  cancelText?: string;
  buttonText: string;
  onConfirm: () => Promise<any>
  onSuccess: () => void
  onError: (error: any) => any
}

export default function ActionButton(props: ActionButtonType) {
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await props.onConfirm();
      setLoading(false);

      props.onSuccess();
    } catch (error) {
      setLoading(false);
      props.onError(error);
    }
  }
  return (
    <Popconfirm
      title={props.title || "Are you sure?"}
      description={props.description || "This will be deleted permanently"}
      placement={props.placement || "left"}
      onConfirm={onConfirm}
      okText={props.okText || "Confirm"}
      cancelText={props.cancelText || "Close"}
    >
      <Button size='small' loading={loading}>
        {props.buttonText}
      </Button>
    </Popconfirm>
  )
}