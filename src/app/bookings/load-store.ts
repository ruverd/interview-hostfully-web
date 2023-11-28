'use client';

import { useRef } from 'react';

import { BookingData } from '@/app/bookings/columns';
import { useBookingStore } from '@/stores/booking-store';

interface BookingLoadStoreProps {
  bookings: BookingData[];
}

export function BookingLoadStore({ bookings }: BookingLoadStoreProps) {
  const { loadBookings } = useBookingStore();

  const initializer = useRef(false);

  if (!initializer.current && bookings) {
    loadBookings(bookings);

    initializer.current = true;
  }

  return null;
}
