import { createFileRoute } from '@tanstack/react-router'

import { MantineProvider, Modal, Stack, Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import HookForm from '#/forms/hook-form';
import MantineTable from '#/tables/mantine-table';

export const Route = createFileRoute('/')({ component: Home })


function Home() {
  const [opened, { open, close }] = useDisclosure()

  return (
    <MantineProvider>
      <Stack p="lg" gap="lg">
        <Group justify='space-between'>
          <h1 className="text-4xl mb-4 font-bold">React Hook Form</h1>
          <Button onClick={open}>Добавить клиента</Button>
        </Group>

        <MantineTable />

        <Modal title="Новый клиент" opened={opened} onClose={close}>
          <HookForm />
        </Modal>
      </Stack>
    </MantineProvider >
  )
}
