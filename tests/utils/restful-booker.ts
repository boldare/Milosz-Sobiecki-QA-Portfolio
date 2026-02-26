import type { APIRequestContext } from '@playwright/test';

export type BookingPayload = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds?: string;
};

export const restfulBookerBaseURL = 'https://restful-booker.herokuapp.com';

export type CreateBookingResponse = {
  bookingid: number;
  booking: BookingPayload;
};

export class RestfulBookerClient {
  private readonly request: APIRequestContext;
  private readonly baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string = restfulBookerBaseURL) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async createToken(): Promise<string> {
    const response = await this.request.post(`${this.baseUrl}/auth`, {
      data: {
        username: 'admin',
        password: 'password123',
      },
    });

    if (!response.ok()) {
      throw new Error(`Auth failed: ${response.status()} ${response.statusText()}`);
    }

    const body = await response.json();
    return body.token as string;
  }

  async createBooking(payload: BookingPayload): Promise<CreateBookingResponse> {
    const response = await this.request.post(`${this.baseUrl}/booking`, {
      data: payload,
    });

    if (!response.ok()) {
      throw new Error(`Create booking failed: ${response.status()} ${response.statusText()}`);
    }

    return (await response.json()) as CreateBookingResponse;
  }

  async getBooking(bookingId: number): Promise<BookingPayload> {
    const response = await this.request.get(`${this.baseUrl}/booking/${bookingId}`);

    if (!response.ok()) {
      throw new Error(`Get booking failed: ${response.status()} ${response.statusText()}`);
    }

    return (await response.json()) as BookingPayload;
  }

  async updateBooking(
    bookingId: number,
    token: string,
    payload: BookingPayload,
  ): Promise<BookingPayload> {
    const response = await this.request.put(`${this.baseUrl}/booking/${bookingId}`, {
      data: payload,
      headers: {
        Cookie: `token=${token}`,
      },
    });

    if (!response.ok()) {
      throw new Error(`Update booking failed: ${response.status()} ${response.statusText()}`);
    }

    return (await response.json()) as BookingPayload;
  }

  async deleteBooking(bookingId: number, token: string): Promise<void> {
    const response = await this.request.delete(`${this.baseUrl}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    if (!response.ok()) {
      throw new Error(`Delete booking failed: ${response.status()} ${response.statusText()}`);
    }
  }
}
