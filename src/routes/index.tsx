import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MantineProvider, TextInput } from '@mantine/core';
import * as z from 'zod'
import '@mantine/core/styles.css';

export const Route = createFileRoute('/')({ component: Home })

const createBookingSchema = z.object({
  phone: z.string('Заполните поле')
    .nonempty('Поле не может быть пустым')
    .regex(/^\+7\d{10}$/, { error: 'Используйте формат +7хххххххххх' }),
  agreement: z.boolean().optional().default(true),
  age: z.number('Заполните возраст')
    .int('Укажите кол-во полных лет')
    .min(18, 'Бронирование доступно лицам от 18 лет')
})

type FormValuesInitial = z.input<typeof createBookingSchema>
type FormValuesFinal = z.output<typeof createBookingSchema>

// type FormValues = {
//   phone: string;
//   agreement: boolean;
// }

function Home() {
  const { register, formState, handleSubmit } = useForm<FormValuesInitial, unknown, FormValuesFinal>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      agreement: true
    }
  })

  return (
    <MantineProvider>
      <div className="p-8">
        <h1 className="text-4xl mb-4 font-bold">React Hook Form</h1>

        <form onSubmit={handleSubmit(console.log)} style={{ maxWidth: 320 }}>
          <TextInput label="Телефон" placeholder='+7xxxxxxxxxx' />
          <section>
            <input type="tel" id="phone" {...register('phone')} />
          </section>
          <p>{formState.errors.phone?.message ?? ""}</p>

          <section>
            <input type="checkbox" id="agreement" {...register('agreement')} />
            <label htmlFor="agreement">Согласен получать рассылки</label>
          </section>

          <section>
            <label htmlFor="age">Ваш возраст</label>
            <input id="age" {...register('age', { valueAsNumber: true })} />
          </section>
          <p>{formState.errors.age?.message ?? ""}</p>

          <button type="submit">Отправить</button>
        </form>
      </div>
    </MantineProvider>
  )
}
