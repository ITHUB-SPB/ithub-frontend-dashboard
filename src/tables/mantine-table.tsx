import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DevTool } from '@hookform/devtools'

import { Popover, Alert, Stack, TextInput, NumberInput, Checkbox, Button, Group, Radio, Table, ActionIcon } from '@mantine/core';
import { DatePicker } from '@mantine/dates'

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

function ActionBar() {
    return (
        <Group gap="sm">
            <ActionIcon>🖊</ActionIcon>

            <Popover width={320}>
                <Popover.Target>
                    <ActionIcon>X</ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                    <Alert color="pink" title="Удаление клиента">
                        <Stack>
                            Подтвердите операцию
                            <Button variant='outline'>Да, удалить</Button>
                        </Stack>
                    </Alert>
                </Popover.Dropdown>
            </Popover>

        </Group>
    )
}

export default function MantineTable() {
    return (
        <Table striped highlightOnHover withTableBorder data={{
            head: ['Phone', 'Birth Date', 'Booking Date', 'Booking Time', ''],
            body: [
                ['+7999000111', '2022-12-05', '2026-11-14', '12:15', <ActionBar />],
                ['+7999000111', '2022-12-05', '2026-11-14', '12:15', <ActionBar />],
                ['+7999000111', '2022-12-05', '2026-11-14', '12:15', <ActionBar />]
            ]
        }} />
    )
}