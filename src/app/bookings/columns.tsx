'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Calendar } from 'lucide-react';
import * as z from 'zod';

import { BookingEditDrawer } from '@/app/bookings/edit/edit-drawer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { convertCentsToCurrency } from '@/lib/currency';
import { getDaysBetweenDates } from '@/lib/date';
import { getInitials } from '@/lib/initials';

const BookingSchema = z.object({
  id: z.number(),
  property: z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    price: z.number(),
  }),
  guestName: z.string(),
  totalGuests: z.number(),
  totalAmount: z.number(),
  checkIn: z.string(),
  checkOut: z.string(),
});

export type BookingData = z.infer<typeof BookingSchema>;
export type Booking = {
  id: number;
  propertyId: number;
  guestName: string;
  totalGuests: number;
  totalAmount: number;
  checkIn: string;
  checkOut: string;
};

export const bookingColumns: ColumnDef<BookingData>[] = [
  {
    accessorKey: 'property.name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Property
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const booking = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <Avatar className='hidden md:block'>
            <AvatarImage src={booking.property.image} />
            <AvatarFallback>
              {getInitials(booking.property.name)}
            </AvatarFallback>
          </Avatar>
          <span className='truncate'>{booking.property.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'guestName',
    header: 'Info',
    cell: ({ row }) => {
      const booking = row.original;

      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);

      const formattedCheckIn = checkIn.toLocaleDateString();
      const formattedCheckOut = checkOut.toLocaleDateString();

      const additionalGuests = booking.totalGuests - 1;
      const bookingNights = getDaysBetweenDates(checkIn, checkOut);

      return (
        <div className='flex flex-col justify-center gap-1 text-xs md:text-sm'>
          <span>
            {booking.guestName}
            {additionalGuests > 0 && (
              <strong className='pl-1'>+{additionalGuests}</strong>
            )}
          </span>
          <span className='font-medium'>
            {convertCentsToCurrency(booking.totalAmount)}
          </span>
          <span className='hidden md:flex items-center gap-1'>
            <Calendar className='w-4 y-4' />
            {formattedCheckIn} - {formattedCheckOut}
          </span>
          <span className='flex items-center gap-1 md:hidden'>
            <Calendar className='w-3 y-3' />
            {bookingNights} {bookingNights > 1 ? 'nights' : 'night'}
          </span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const booking = row.original;

      const bookingData = {
        id: booking.id,
        propertyId: booking.property.id,
        guestName: booking.guestName,
        totalGuests: booking.totalGuests,
        totalAmount: booking.totalAmount,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
      } as Booking;

      return <BookingEditDrawer booking={bookingData} />;
    },
  },
];
