import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type FormStore = {
    currentStep: number;
    agreement: boolean;
    bookingDate: string;
    phone?: string;
    monthOfBirth?: number;
    yearOfBirth?: number;
    bookingTime?: string;
    setBookingDate: (value: string) => void;
    setBookingTime: (value: string) => void;
    setCurrentStep: (value: number) => void;
}

export const useFormStore = create<FormStore>()(
    persist(
        (set, get) => ({
            agreement: true,
            bookingDate: new Date().toISOString().split('T')[0],
            currentStep: 0,

            setBookingDate: (newDate: string) => set({ bookingDate: newDate }),
            setBookingTime: (newTime: string) => set({ bookingTime: newTime }),
            setCurrentStep: (newStep: number) => set({ currentStep: newStep })
        }),
        { name: 'booking_form' }
    )
)