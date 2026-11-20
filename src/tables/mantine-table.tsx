import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DevTool } from '@hookform/devtools'

import { Popover, Alert, Stack, MaskInput, TextInput, NumberInput, Checkbox, Button, Group, Radio, Table, ActionIcon } from '@mantine/core';
import { DateInput } from '@mantine/dates'
import { notifications } from '@mantine/notifications'

import classes from '../mantine.module.css'

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const data = [
    ['+79990001111', '2022-12-05', '2026-11-14', '12:15'],
    ['+79990001112', '2022-12-05', '2026-11-14', '12:15'],
    ['+79990001113', '2022-12-05', '2026-11-14', '12:15']
]

type ActionBarProps = {
    onEditClick: () => void;
    isEditing: boolean;
}

function ActionBar({ isEditing, onEditClick }: ActionBarProps) {
    return (
        <Group gap="sm">

            {isEditing ? (
                <Group>
                    <ActionIcon onClick={onEditClick}>✔️</ActionIcon>
                    <ActionIcon onClick={onEditClick}>🚫</ActionIcon>
                </Group>
            ) : <ActionIcon onClick={onEditClick}>🖊</ActionIcon>}

            <Popover width={320}>
                <Popover.Target>
                    <ActionIcon>X</ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                    <Alert color="pink" title="Удаление клиента">
                        <Stack>
                            Подтвердите операцию
                            <Button
                                variant='outline'
                                onClick={() => notifications.show({
                                    title: "Удалено",
                                    message: "Успешно",
                                    autoClose: 2000
                                })}
                            >Да, удалить</Button>
                        </Stack>
                    </Alert>
                </Popover.Dropdown>
            </Popover>

        </Group>
    )
}

export default function MantineTable() {
    const [tableData, setTableData] = useState(data)
    const [editRowId, setEditRowId] = useState<null | number>(null)

    return (
        <Table striped highlightOnHover withTableBorder data={{
            head: ['Phone', 'Birth Date', 'Booking Date', 'Booking Time', ''],
            body: tableData.map((item, ix) => [
                <MaskInput
                    classNames={{ input: classes.cell }}
                    mask="\+7 (999) 999-99-99"
                    value={item[0]}
                    readOnly={editRowId !== ix}
                />,
                <DateInput value={item[1]} classNames={{ input: classes.cell }} readOnly={editRowId !== ix} />,

                <ActionBar isEditing={editRowId === ix} onEditClick={() => setEditRowId(ix)} />
            ])
        }} />
    )
}