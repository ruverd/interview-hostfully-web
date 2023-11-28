'use server';

import { revalidatePath } from 'next/cache';

import { Booking } from '@/app/bookings/columns';

export async function updateBooking(
  bookingId: string,
  data: Partial<Booking>
): Promise<void> {
  const res = await fetch(
    `https://65628a07ee04015769a67b94.mockapi.io/api/bookings/${bookingId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error('Network response was not OK');
  }

  revalidatePath('/bookings');
}
