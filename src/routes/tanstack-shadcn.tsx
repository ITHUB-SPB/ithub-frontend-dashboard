import { createFileRoute } from '@tanstack/react-router'
import TanstackTable from '#/tables/tanstack-table'

export const Route = createFileRoute('/tanstack-shadcn')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <TanstackTable />
  )
}
