'use client';

import { Plus } from 'lucide-react';
import { useContext } from 'react';

import { BookingFormCreate } from '@/app/bookings/create/form-create';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/contexts/sheet-context';

export function BookingCreateDrawer() {
  const { show, setShow } = useContext(SheetContext);

  return (
    <Sheet open={show} onOpenChange={setShow} key={'create-sheet'}>
      <SheetTrigger>
        <div
          role='button'
          className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
        >
          <Plus />
          <span>New Booking</span>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Booking</SheetTitle>
        </SheetHeader>
        <BookingFormCreate />
      </SheetContent>
    </Sheet>
  );
}
