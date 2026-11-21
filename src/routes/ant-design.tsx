import { createContext } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ConfigProvider, App, Layout, Typography, notification } from 'antd'
import ruLocale from 'antd/locale/ru_RU'
import 'antd/dist/antd.css'

import AntdTable from '#/tables/antd-table'

export const Route = createFileRoute('/ant-design')({
  component: RouteComponent,
})

const Context = createContext(undefined)

function RouteComponent() {
  const [notificationApi, context] = notification.useNotification()

  return (
    <ConfigProvider locale={ruLocale} theme={{ zeroRuntime: true }}>
      <App>
        <Layout>
          <Layout.Header style={{ background: 'white', textAlign: 'center' }}>
            <Typography.Title level={1}>AntD</Typography.Title>
          </Layout.Header>
          <Layout.Content>
            <Context.Provider value={undefined}>
              {context}
              <AntdTable notificationApi={notificationApi} />
            </Context.Provider>
          </Layout.Content>
        </Layout>
      </App>
    </ConfigProvider>
  )
}
