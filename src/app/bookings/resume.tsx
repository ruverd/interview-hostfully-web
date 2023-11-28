import { Property } from '@/data/properties';
import { convertCentsToCurrency } from '@/lib/currency';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface BookingResumeProps {
  property: Property;
  nights: number;
}

const SERVICE_FEE = 5000;

export function BookingResume({ property, nights = 1 }: BookingResumeProps) {
  const stayAmount = property?.price * nights;
  const totalAmount = stayAmount + SERVICE_FEE;

  if (!property) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='space-x-1'>
          <strong className='font-bold'>
            {convertCentsToCurrency(property.price)}
          </strong>
          <span className='text-sm font-normal'>night</span>
        </CardTitle>
        <CardDescription>Booking resume</CardDescription>
      </CardHeader>
      <CardContent className='text-sm'>
        <div className='flex justify-between items-center'>
          <span>
            {convertCentsToCurrency(property.price)} x {nights} nights
          </span>
          <strong className='font-normal'>
            {convertCentsToCurrency(stayAmount)}
          </strong>
        </div>
        <div className='flex justify-between items-center'>
          <span>Service fee</span>
          <strong className='font-normal'>
            {convertCentsToCurrency(SERVICE_FEE)}
          </strong>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between items-center'>
        <span>Total before taxes</span>
        <strong className='font-bold'>
          {convertCentsToCurrency(totalAmount)}
        </strong>
      </CardFooter>
    </Card>
  );
}
