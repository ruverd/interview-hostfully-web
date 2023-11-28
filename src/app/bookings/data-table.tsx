import { BookingData, bookingColumns } from '@/app/bookings/columns';
import { BookingCreateDrawer } from '@/app/bookings/create/create-drawer';
import { DataTable } from '@/components/data-table';

interface BookingDataTableProps {
  bookings: BookingData[];
}

export function BookingDataTable({ bookings }: BookingDataTableProps) {
  return (
    <DataTable
      columns={bookingColumns}
      data={bookings}
      filterBy={{
        key: 'guestName',
        label: 'guest name',
      }}
    >
      <BookingCreateDrawer />
    </DataTable>
  );
}
