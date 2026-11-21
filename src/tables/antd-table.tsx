import { useState } from 'react';
import { Button, Table, Space, Popconfirm, Checkbox, Radio, DatePicker, Form, Input, InputNumber, type TableColumnsType } from 'antd'
import { CheckCircleTwoTone, EditTwoTone, DeleteTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import type { NotificationInstance } from 'antd/es/notification/interface';

// import classes from '../styles/mantine.module.css'

type Row = {
    phone: string;
    birthDate: string;
    bookingDate: string;
    bookingTime: string;
    paymentType: string;
    key: string;
}

const data: Row[] = [
    { phone: '+79990001111', birthDate: '2022-12-05', bookingDate: '2026-11-13', bookingTime: '2025-11-13T10:15:00.0000Z', paymentType: 'cash' },
    { phone: '+79990001112', birthDate: '2024-02-05', bookingDate: '2026-11-14', bookingTime: '2026-05-05T06:20:13.0000Z', paymentType: 'cash' },
    { phone: '+79990001113', birthDate: '2000-07-08', bookingDate: '2026-11-14', bookingTime: '2026-08-10T14:00:28.0000Z', paymentType: 'card' }
].map((item, ix) => ({ ...item, key: String(ix) }))

type ActionBarProps = {
    notificationApi: NotificationInstance;
    onEditClick: () => void;
    isEditing: boolean;
}

function ActionBar({ isEditing, onEditClick, notificationApi }: ActionBarProps) {
    return (
        <Space size="small">
            {isEditing ? (
                <Space size="small">
                    <Button icon={<CheckCircleTwoTone />} onClick={onEditClick} shape='circle' />
                    <Button icon={<CloseCircleTwoTone />} onClick={onEditClick} shape='circle' />
                </Space>
            ) : <Button icon={<EditTwoTone />} onClick={onEditClick} shape='circle' />}

            <Popconfirm
                title="Удаление клиента"
                description="Подтвердите операцию"
                onConfirm={() => {
                    notificationApi.warning({
                        title: "Успешно",
                        description: "Запись удалена",
                    })
                }}>
                <Button icon={<DeleteTwoTone />} shape='circle' />
            </Popconfirm>
        </Space>
    )
}

export default function AntdTable({ notificationApi }: { notificationApi: NotificationInstance }) {
    const [editRowId, setEditRowId] = useState<null | string>(null)

    const columns: TableColumnsType<Row> = [
        {
            title: "Phone",
            dataIndex: 'phone',
            key: 'phone',
            sorter: (a, b) => a.phone > b.phone ? 1 : -1,
            defaultSortOrder: 'ascend'
        },
        {
            title: "Birth Date",
            dataIndex: 'birthDate',
            key: 'birthDate',
            sorter: (a, b) => new Date(a.birthDate) > new Date(b.birthDate) ? 1 : -1,
            render: (value: string) => new Date(value).toLocaleDateString('ru')
        },
        { title: "Booking Date", dataIndex: 'bookingDate', key: 'bookingDate' },
        {
            title: "Booking Time",
            dataIndex: 'bookingTime',
            key: 'bookingTime',
            render: (value: string) => new Date(value).toLocaleTimeString('ru')
        },
        {
            title: "Payment Type",
            dataIndex: 'paymentType',
            key: 'paymentType',
            filters: [
                {
                    text: 'Card',
                    value: 'card'
                },
                {
                    text: 'Cash',
                    value: 'cash'
                }
            ],
            onFilter: (value, record) => value === record.paymentType,
            defaultFilteredValue: ['card', 'cash']
        },
        {
            title: "",
            dataIndex: '',
            key: 'actions',
            render: (_, row) => <ActionBar notificationApi={notificationApi} isEditing={editRowId === row.key} onEditClick={() => setEditRowId(row.key)} />
        },
    ]

    return (
        <Table<Row>
            dataSource={data}
            columns={columns}
            pagination={{
                hideOnSinglePage: true
            }}
        />
    )
}