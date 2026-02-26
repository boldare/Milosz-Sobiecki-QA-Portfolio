import { z } from 'zod';

export const bookingDatesSchema = z.object({
  checkin: z.string(),
  checkout: z.string(),
});

export const bookingSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  totalprice: z.number(),
  depositpaid: z.boolean(),
  bookingdates: bookingDatesSchema,
  additionalneeds: z.string().optional(),
});

export const bookingIdSchema = z.object({
  bookingid: z.number(),
});
