import { getBookings } from '@/actions/get-bookings';
import { BookingDataTable } from '@/app/bookings/data-table';
import { BookingLoadStore } from '@/app/bookings/load-store';
import { PageTitle } from '@/components/page-title';

export default async function Booking() {
  const bookings = await getBookings();

  return (
    <section className='container my-6 space-y-4'>
      <BookingLoadStore bookings={bookings} />
      <PageTitle title='Bookings' subtitle="Here's a list of your bookings" />

      <BookingDataTable bookings={bookings} />
    </section>
  );
}
