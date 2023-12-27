'use client'

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Layout, Menu, Button, Breadcrumb, Divider, theme } from 'antd';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import styles from '@/app/styles/pages-layout.module.css';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { getBreadcrumbItems } from '@/utils/breadcrumb';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';

const { Header, Sider, Content } = Layout;

export default function PagesLayout({ children }: { children: React.ReactNode}) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const [breadCrumbItems, setItems] = useState<ItemType[]>([]);

  const siderItems: MenuItemType[] = [
    {
      key: 'dashboard',
      icon: <UserOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'users/manage',
      icon: <UserOutlined />,
      label: 'Users',
    },
  ];

  const onMenuItemClick = (event: any) => {
    router.push(event.key);
  }

  useEffect(
    () => {
      const breadcrumbItems = getBreadcrumbItems(pathname)
      setItems(breadcrumbItems);
    },
    [pathname]
  );

  return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={styles.logoContainer}>
            <div className={styles.logo} />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            items={siderItems}
            onClick={onMenuItemClick}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
          </Header>
          <Content style={{ margin: '16px', minHeight: "100vh" }}>
            <Breadcrumb items={breadCrumbItems} className='breadCrumbContainer' />
            {children}
          </Content>
        </Layout>
      </Layout>
  )
}