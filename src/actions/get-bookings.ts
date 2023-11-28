'use server';

import { Booking, BookingData } from '@/app/bookings/columns';
import { properties } from '@/data/properties';

export async function getBookings(): Promise<BookingData[]> {
  const res = await fetch(
    'https://65628a07ee04015769a67b94.mockapi.io/api/bookings'
  );

  const data = (await res.json()) as Booking[];

  const bookings = data.map((booking) => {
    const property = properties.filter(
      (property) => property.id === booking.propertyId
    )[0];

    return {
      ...booking,
      property,
    };
  }) as BookingData[];

  return bookings;
}
