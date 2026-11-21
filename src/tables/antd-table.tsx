import { useState } from 'react';
import { Button, Table, Space, Popconfirm, Checkbox, Radio, DatePicker, Form, Input, InputNumber } from 'antd'
import { CheckCircleTwoTone, EditTwoTone, DeleteTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import type { NotificationInstance } from 'antd/es/notification/interface';

// import classes from '../styles/mantine.module.css'

const data = [
    { phone: '+79990001111', birthDate: '2022-12-05', bookingDate: '2026-11-13', bookingTime: '10:15' },
    { phone: '+79990001112', birthDate: '2024-02-05', bookingDate: '2026-11-14', bookingTime: '12:25' },
    { phone: '+79990001113', birthDate: '2000-07-08', bookingDate: '2026-11-14', bookingTime: '12:35' }
]

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
    const [tableData, setTableData] = useState(data)
    const [editRowId, setEditRowId] = useState<null | number>(null)

    return (
        <Table
            dataSource={data.map((item, ix) => ({ ...item, key: String(ix) }))}
            columns={[
                { title: "Phone", dataIndex: 'phone', key: 'phone' },
                { title: "Birth Date", dataIndex: 'birthDate', key: 'birthDate' },
                { title: "Booking Date", dataIndex: 'bookingDate', key: 'bookingDate' },
                { title: "Booking Time", dataIndex: 'bookingTime', key: 'bookingTime' },
                { title: "", dataIndex: '', key: 'actions' },
            ]}
            pagination={{
                hideOnSinglePage: true
            }}

        // data={{
        //     head: ['Phone', 'Birth Date', 'Booking Date', 'Booking Time', ''],
        //     body: tableData.map((item, ix) => [
        //         <MaskInput
        //             classNames={{ input: classes.cell }}
        //             mask="\+7 (999) 999-99-99"
        //             value={item[0]}
        //             readOnly={editRowId !== ix}
        //         />,
        //         <DateInput value={item[1]} classNames={{ input: classes.cell }} readOnly={editRowId !== ix} />,

        //         <ActionBar isEditing={editRowId === ix} onEditClick={() => setEditRowId(ix)} />
        //     ])
        // }} 
        />
    )
}