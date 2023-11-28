'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, format, subDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useContext, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { createBooking } from '@/actions/create-booking';
import { Booking } from '@/app/bookings/columns';
import { BookingResume } from '@/app/bookings/resume';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { SheetContext } from '@/contexts/sheet-context';
import { properties } from '@/data/properties';
import { getAllDatesBetween, getDaysBetweenDates } from '@/lib/date';
import { cn } from '@/lib/style';
import { useBookingStore } from '@/stores/booking-store';

const BookingFormCreateSchema = z.object({
  propertyId: z.coerce.number(),
  guestName: z.string(),
  totalGuests: z.coerce.number(),
  when: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

type BookingFormCreateType = z.infer<typeof BookingFormCreateSchema>;

export function BookingFormCreate() {
  const { toast } = useToast();
  const { bookings } = useBookingStore();
  const { setShow } = useContext(SheetContext);

  const formMethods = useForm<BookingFormCreateType>({
    resolver: zodResolver(BookingFormCreateSchema),
    defaultValues: {
      propertyId: 1,
      totalGuests: 1,
      when: {
        from: new Date(),
        to: addDays(new Date(), 2),
      },
    },
  });

  const { watch, control, handleSubmit } = formMethods;

  const watchWhen = watch('when');
  const watchPropertyId = watch('propertyId');

  const nights = useMemo(() => {
    if (!watchWhen?.from || !watchWhen?.to) {
      return 1;
    }

    const nights = getDaysBetweenDates(watchWhen.from, watchWhen.to);

    return nights;
  }, [watchWhen]);

  const property = useMemo(() => {
    const foundProperty = properties.find(
      (property) => property.id == watchPropertyId
    );

    return foundProperty || properties[0];
  }, [watchPropertyId]);

  const onSubmit = async (data: BookingFormCreateType) => {
    try {
      const totalAmount = property.price * nights + 5000;

      const whenArray = getAllDatesBetween(data.when.from, data.when.to);
      console.log('whenArray', whenArray);

      const isBooked = bookings
        ?.filter((b) => b.property.id === data.propertyId)
        .some((b) => {
          const bookedDates = getAllDatesBetween(
            new Date(b.checkIn),
            new Date(b.checkOut)
          );
          return whenArray.some((date) => bookedDates.includes(date));
        });

      if (isBooked) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'This property is already booked for this dates.',
          duration: 5000,
        });
      } else {
        const booking = {
          propertyId: data.propertyId,
          guestName: data.guestName,
          totalGuests: data.totalGuests,
          totalAmount: totalAmount,
          checkIn: data.when.from.toString(),
          checkOut: data.when.to.toString(),
        } as Omit<Booking, 'id'>;

        await createBooking(booking);

        setShow(false);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There has been a problem with your make this operation.',
        duration: 5000,
      });
    }
  };

  return (
    <div className='space-y-6'>
      <Form {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
          <FormField
            control={control}
            name='propertyId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a verified email to display' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={String(property.id)}>
                        {property.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='totalGuests'
            render={({ field }) => (
              <FormItem>
                <FormLabel>How many guests</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a verified email to display' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem key={1} value='1'>
                      1 guest
                    </SelectItem>
                    <SelectItem key={2} value='2'>
                      2 guest
                    </SelectItem>
                    <SelectItem key={3} value='3'>
                      3 guest
                    </SelectItem>
                    <SelectItem key={4} value='4'>
                      4 guest
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='guestName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder='John Doe' {...field} />
                </FormControl>
                <FormDescription>
                  Guest responsible for the booking
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='when'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>When</FormLabel>
                <div className='grid gap-2'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id='date'
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !watchWhen && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {watchWhen?.from ? (
                          watchWhen.to ? (
                            <>
                              {format(watchWhen.from, 'LLL dd, y')} -{' '}
                              {format(watchWhen.to, 'LLL dd, y')}
                            </>
                          ) : (
                            format(watchWhen.from, 'LLL dd, y')
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        initialFocus
                        mode='range'
                        disabled={[
                          {
                            from: new Date('1900-01-01'),
                            to: subDays(new Date(), 1),
                          },
                        ]}
                        defaultMonth={field.value?.from}
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormDescription>
                  Select check-in and check-out dates
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full'>
            Book now
          </Button>
        </form>
      </Form>

      <BookingResume property={property} nights={nights} />
    </div>
  );
}
