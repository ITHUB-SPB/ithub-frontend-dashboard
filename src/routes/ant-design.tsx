import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ant-design')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/ant-design"!</div>
}
