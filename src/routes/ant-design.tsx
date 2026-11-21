import { createContext, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ConfigProvider, App, Button, Layout, Drawer, Typography, Flex, notification } from 'antd'
import { PlusCircleTwoTone } from '@ant-design/icons'
import ruLocale from 'antd/locale/ru_RU'
import 'antd/dist/antd.css'

import AntdTable from '#/tables/antd-table'

export const Route = createFileRoute('/ant-design')({
  component: RouteComponent,
})

const Context = createContext(undefined)

function RouteComponent() {
  const [notificationApi, context] = notification.useNotification()
  const [isDrawerOpened, setDrawer] = useState<boolean>(false)

  return (
    <ConfigProvider locale={ruLocale} theme={{ zeroRuntime: true }}>
      <App>
        <Layout>
          <Layout.Header style={{ background: 'white' }}>
            <Flex justify='space-between' align='center'>
              <Typography.Title level={1}>AntD</Typography.Title>
              <Button
                icon={<PlusCircleTwoTone />}
                onClick={() => setDrawer(true)}
              >Добавить</Button>
            </Flex>
          </Layout.Header>
          <Layout.Content>
            <Context.Provider value={undefined}>
              {context}
              <AntdTable notificationApi={notificationApi} />
              <Drawer
                open={isDrawerOpened}
                onClose={() => setDrawer(false)}
                title="Новый клиент"
              >
              </Drawer>
            </Context.Provider>
          </Layout.Content>
        </Layout>
      </App>
    </ConfigProvider>
  )
}
