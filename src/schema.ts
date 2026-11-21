import * as z from "zod"

export const createBookingSchema = z.object({
    phone: z.string('Заполните поле')
        .nonempty('Поле не может быть пустым')
        .regex(/^\+7\d{10}$/, { error: 'Используйте формат +7хххххххххх' }),
    agreement: z.boolean().optional().default(true),
    monthOfBirth: z.number('Месяц рождения').int().min(1).max(12),
    yearOfBirth: z.number('Год рождения').int().min(1900).max(2026),
    bookingDate: z.iso.date('Выберите день'),
    bookingTime: z.iso.time('Выберите слот')
})

export const createBookingStepFirstSchema = createBookingSchema.pick({
    phone: true,
    monthOfBirth: true,
    yearOfBirth: true
})

export const createBookingStepSecondSchema = createBookingSchema.pick({
    bookingDate: true,
    bookingTime: true
})