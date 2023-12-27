'use client'

import { alphaFieldValidation, emailFieldValidation, validateMessages } from '@/utils/form';
import { Form, Input, Button, DatePicker } from 'antd';

export type CreateUserType = {
  name: string;
  middleName?: string;
  lastName: string;
  email: string;
  birthDate: string;
}

type UsersFormPropsType = {
  onSubmit: (values: CreateUserType) => Promise<void>;
  submitted: boolean;
}

export default function UsersForm(props: UsersFormPropsType) {
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

  const onFinish = () => {
    const values = form.getFieldsValue();
    props.onSubmit(values);
  }

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
      <Form.Item>
        <Button shape='round' htmlType='submit' loading={props.submitted}>Submit</Button>
      </Form.Item>
    </Form>
  )
}
