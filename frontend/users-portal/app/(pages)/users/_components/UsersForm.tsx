'use client'

import { alphaFieldValidation, emailFieldValidation, validateMessages } from '@/utils/form';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { User } from './actions';
import { useEffect } from 'react';
import { getTimestampFormatted, getTimestampInstance } from '@/lib/utils';

export interface UserPayload {
  name: string;
  middleName?: string;
  lastName: string;
  email: string;
  birthDate: string;
  status?: string;
}

interface UsersFormProps {
  onSubmit: (values: UserPayload) => Promise<void>;
  submitted: boolean;
  user?: User;
}

export default function UsersForm(props: UsersFormProps) {
  const [form] = Form.useForm();

  const nameRules = [
    { required: true },
    { validator: (_, value) => alphaFieldValidation(value) }
  ];
  
  const middleNameRules = [
    { validator: (_, value) => alphaFieldValidation(value) }
  ];
  
  const lastNameRules = [
    { required: true },
    { validator: (_, value) => alphaFieldValidation(value) }
  ];
  
  const emailRules = [
    { required: true },
    { validator: (_, value) => emailFieldValidation(value) }
  ];

  const birthDateRules = [
    { required: true }
  ];

  const statusRules = [
    { required: true }
  ];

  const onFinish = () => {
    const values = form.getFieldsValue();
    console.log(values.birthDate);
    const payload: UserPayload = {
      name: values.name,
      middleName: values.middleName || null,
      lastName: values.lastName,
      email: values.email,
      birthDate: getTimestampFormatted(values.birthDate, 'YYYY-MM-DD'),
      status: values.status || 'active' 
    };

    props.onSubmit(payload);
  }

  const setValues = () => {
    form.setFieldsValue({
      name: props.user?.name,
      middleName: props.user?.middleName || null,
      lastName: props.user?.lastName,
      email: props.user?.email,
      birthDate: getTimestampInstance(props.user?.birthDate || ''),
      status: props.user?.status,
    })
  };

  useEffect(
    () => {
      if (props && props.user) {
        setValues();
      }
    },
    [props])

  return (
    <Form form={form} validateMessages={validateMessages} onFinish={onFinish}>
      <Form.Item name="name" label="Name" rules={nameRules} hasFeedback>
        <Input maxLength={45} />
      </Form.Item>
      <Form.Item name="middleName" label="Middle Name" rules={middleNameRules} hasFeedback>
        <Input maxLength={45} />
      </Form.Item>
      <Form.Item name="lastName" label="Last Name" rules={lastNameRules} hasFeedback>
        <Input maxLength={45} />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={emailRules} hasFeedback>
        <Input maxLength={65} type='email' />
      </Form.Item>
      <Form.Item name="birthDate" label="Birth Date" rules={birthDateRules} hasFeedback>
        <DatePicker className='w-full' />
      </Form.Item>
      {props.user && (
        <Form.Item name="status" label="Status" rules={statusRules} hasFeedback>
          <Select
            options={[
              { value: 'active', label: 'Active' },
              { value: 'disabled', label: 'Disabled' },
              { value: 'blocked', label: 'Blocked' },
            ]}
        />
        </Form.Item>
      )}
      <Form.Item>
        <Button shape='round' htmlType='submit' loading={props.submitted}>Submit</Button>
      </Form.Item>
    </Form>
  )
}
