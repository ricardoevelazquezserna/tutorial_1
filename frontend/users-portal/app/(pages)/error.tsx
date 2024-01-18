'use client'

import { getUniqueKey } from '@/lib/utils'
import { Button, Result } from 'antd';

export default function PagesError({
  error,
  reset,
}: {
  error: any
  reset: () => void
}) {
  return (
    <Result
      status={'500'}
      title={'Ooops!'}
      subTitle={error?.message || 'Something went wrong.'}
      extra={[
        <Button key={getUniqueKey()}>Exit</Button>,
        <Button key={getUniqueKey()} onClick={()=> reset()}>Try again</Button>,
      ]}
    />
  )
}