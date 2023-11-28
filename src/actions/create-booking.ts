'use server';

import { revalidatePath } from 'next/cache';

import { Booking } from '@/app/bookings/columns';

export async function createBooking(
  booking: Omit<Booking, 'id'>
): Promise<void> {
  const res = await fetch(
    'https://65628a07ee04015769a67b94.mockapi.io/api/bookings',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    }
  );

  if (!res.ok) {
    throw new Error('Network response was not OK');
  }

  revalidatePath('/bookings');
}
