import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DevTool } from '@hookform/devtools'

import { Stack, TextInput, NumberInput, Checkbox, Button, Group, Radio } from '@mantine/core';
import { DatePicker } from '@mantine/dates'

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import * as z from 'zod'

import { useFormStore } from '#/store';
import classes from '../mantine.module.css'

const createBookingSchema = z.object({
    phone: z.string('Заполните поле')
        .nonempty('Поле не может быть пустым')
        .regex(/^\+7\d{10}$/, { error: 'Используйте формат +7хххххххххх' }),
    agreement: z.boolean().optional().default(true),
    monthOfBirth: z.number('Месяц рождения').int().min(1).max(12),
    yearOfBirth: z.number('Год рождения').int().min(1900).max(2026),
    bookingDate: z.iso.date('Выберите день'),
    bookingTime: z.iso.time('Выберите слот')
})

const createBookingStepFirstSchema = createBookingSchema.pick({
    phone: true,
    monthOfBirth: true,
    yearOfBirth: true
})

const createBookingStepSecondSchema = createBookingSchema.pick({
    bookingDate: true,
    bookingTime: true
})

const steps = [
    createBookingStepFirstSchema.keyof().options,
    createBookingStepSecondSchema.keyof().options
]

type FormValuesInitial = z.input<typeof createBookingSchema>
type FormValuesFinal = z.output<typeof createBookingSchema>

// type FormValues = {
//   phone: string;
//   agreement: boolean;
// }

export default function HookForm() {
    const bookingDate = useFormStore(store => store.bookingDate)
    const setBookingDate = useFormStore(store => store.setBookingDate)

    const bookingTime = useFormStore(store => store.bookingTime)
    const setBookingTime = useFormStore(store => store.setBookingTime)

    const currentStep = useFormStore(store => store.currentStep)
    const setCurrentStep = useFormStore(store => store.setCurrentStep)

    const { register, control, setValue, formState, handleSubmit, trigger } = useForm<FormValuesInitial, unknown, FormValuesFinal>({
        resolver: zodResolver(createBookingSchema),
        defaultValues: {
            agreement: true,
            bookingDate
        }
    })

    return (
        <>
            <form
                style={{ maxWidth: 420 }}
                onSubmit={async (event) => {
                    event.preventDefault()
                    console.log(event)

                    if (currentStep < 4) {
                        if (await trigger(steps[currentStep], { shouldFocus: true })) {
                            setCurrentStep(currentStep + 1)
                        }
                    } else {
                        handleSubmit(event => { console.log(event) })
                    }
                }}
            >
                <Stack gap="md">
                    {currentStep === 0 && (
                        <>
                            <TextInput
                                label="Телефон"
                                placeholder='+7xxxxxxxxxx'
                                error={formState.errors.phone?.message}
                                {...register('phone')}
                            />

                            <Group gap="sm">
                                <Controller
                                    name="monthOfBirth"
                                    control={control}
                                    render={({ field }) => (
                                        <NumberInput
                                            {...field}
                                            min={1}
                                            max={12}
                                            placeholder="MM"
                                            step={1}
                                            error={formState.errors.monthOfBirth?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    name="yearOfBirth"
                                    control={control}
                                    render={({ field }) => (
                                        <NumberInput
                                            {...field}
                                            min={1900}
                                            max={2026}
                                            placeholder="YYYY"
                                            step={1}
                                            error={formState.errors.yearOfBirth?.message}
                                        />
                                    )}
                                />
                            </Group>

                            <Button type="submit">Далее</Button>
                        </>
                    )}

                    {currentStep === 1 && (
                        <>
                            <Controller
                                name="bookingDate"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        fullWidth
                                        value={bookingDate}
                                        allowDeselect={false}
                                        onChange={(value) => {
                                            if (!value) return
                                            setBookingDate(value)
                                            setValue('bookingDate', value)
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                name="bookingTime"
                                control={control}
                                render={({ field }) => (
                                    <Radio.Group {...field} value={bookingTime} onChange={(value) => {
                                        setBookingTime(value)
                                        setValue('bookingTime', value)
                                    }}>
                                        <Radio.Card className={classes['time-card']} key="12:00:00" value="12:00:00">12:00</Radio.Card>
                                        <Radio.Card className={classes['time-card']} key="12:15:00" value="12:15:00">12:15</Radio.Card>
                                    </Radio.Group>
                                )}
                            />

                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <Checkbox
                                label="Согласен получать рассылки"
                                {...register('agreement')}
                            />

                            <Button type="submit" fullWidth>
                                Отправить
                            </Button>
                        </>
                    )}

                </Stack>
            </form>
            {/* <DevTool control={control} /> */}
        </>
    )
}