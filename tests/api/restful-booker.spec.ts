import { test, expect } from '../fixtures/portfolio-fixtures';
import { buildBookingPayload } from '../data/factories/booking-factory';
import { RestfulBookerClient, restfulBookerBaseURL } from '../utils/restful-booker';
import { bookingIdSchema, bookingSchema } from '../utils/restful-booker.schemas';

test.describe('Restful Booker API @api @smoke', () => {
  let client: RestfulBookerClient;
  let token = '';
  let bookingId: number | null = null;

  test.beforeEach(async ({ request }) => {
    client = new RestfulBookerClient(request);
    token = await client.createToken();
  });

  test.afterEach(async () => {
    if (!bookingId) return;

    try {
      await client.deleteBooking(bookingId, token);
    } finally {
      bookingId = null;
    }
  });

  test('creates, updates, and deletes a booking', async () => {
    const createPayload = buildBookingPayload();
    const updatePayload = buildBookingPayload({ firstname: 'Updated', lastname: 'Booking' });

    await test.step('Create booking', async () => {
      await test.info().attach('create-payload.json', {
        body: JSON.stringify(createPayload, null, 2),
        contentType: 'application/json',
      });

      const created = await client.createBooking(createPayload);
      bookingIdSchema.parse(created);
      bookingSchema.parse(created.booking);

      bookingId = created.bookingid;

      await test.info().attach('create-response.json', {
        body: JSON.stringify(created, null, 2),
        contentType: 'application/json',
      });
    });

    await test.step('Get booking', async () => {
      if (!bookingId) throw new Error('Booking id was not created.');

      const booking = await client.getBooking(bookingId);
      bookingSchema.parse(booking);

      expect(booking.firstname).toBe(createPayload.firstname);
      expect(booking.lastname).toBe(createPayload.lastname);

      await test.info().attach('get-response.json', {
        body: JSON.stringify(booking, null, 2),
        contentType: 'application/json',
      });
    });

    await test.step('Update booking', async () => {
      if (!bookingId) throw new Error('Booking id was not created.');

      await test.info().attach('update-payload.json', {
        body: JSON.stringify(updatePayload, null, 2),
        contentType: 'application/json',
      });

      const updated = await client.updateBooking(bookingId, token, updatePayload);
      bookingSchema.parse(updated);

      expect(updated.firstname).toBe(updatePayload.firstname);
      expect(updated.totalprice).toBe(updatePayload.totalprice);

      await test.info().attach('update-response.json', {
        body: JSON.stringify(updated, null, 2),
        contentType: 'application/json',
      });
    });
  });

  test('rejects update without auth token', async ({ request }) => {
    const createPayload = buildBookingPayload();
    const created = await client.createBooking(createPayload);
    bookingId = created.bookingid;

    const response = await request.put(`${restfulBookerBaseURL}/booking/${bookingId}`, {
      data: buildBookingPayload({ firstname: 'NoAuth' }),
    });

    expect([401, 403]).toContain(response.status());
  });

  test('rejects invalid booking payload', async ({ request }) => {
    const response = await request.post(`${restfulBookerBaseURL}/booking`, {
      data: { firstname: 'OnlyName' },
    });

    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});
