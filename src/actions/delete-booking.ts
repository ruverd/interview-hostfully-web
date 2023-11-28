'use server'

import { revalidatePath } from 'next/cache';

export async function deleteBooking(bookingId: string): Promise<void> {
  const res = await fetch(
    `https://65628a07ee04015769a67b94.mockapi.io/api/bookings/${bookingId}`,
    {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  revalidatePath('/bookings')
}
