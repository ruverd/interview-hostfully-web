import { create } from 'zustand';

import { BookingData } from '@/app/bookings/columns';

interface BookingStoreProps {
  bookings: BookingData[] | undefined;
  loadBookings: (bookings: BookingData[]) => void;
}

export const useBookingStore = create<BookingStoreProps>((set) => ({
  bookings: undefined,
  loadBookings: (bookings: BookingData[]) => set((state) => ({ bookings })),
}));
