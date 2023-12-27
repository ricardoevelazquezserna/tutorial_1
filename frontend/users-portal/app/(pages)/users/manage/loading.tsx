import { Flex, Spin } from "antd";

export default function Loading() {
  return (
    <Flex align="center" justify="center" gap="middle">
      <Spin />
    </Flex>
  )
}