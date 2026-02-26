import { faker } from '@faker-js/faker';
import type { BookingPayload } from '../../utils/restful-booker';

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const buildBookingPayload = (overrides: Partial<BookingPayload> = {}): BookingPayload => {
  const startOffset = faker.number.int({ min: 1, max: 20 });
  const stayLength = faker.number.int({ min: 1, max: 7 });
  const checkinDate = addDays(new Date(), startOffset);
  const checkoutDate = addDays(checkinDate, stayLength);

  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 50, max: 500 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: formatDate(checkinDate),
      checkout: formatDate(checkoutDate),
    },
    additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Late checkout', 'Baby crib']),
    ...overrides,
  };
};
