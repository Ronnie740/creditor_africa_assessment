import { z } from 'zod';

export const checkoutSchema = z.object({
	// Account Step
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),

	// Shipping Step
	addressLine1: z.string().min(1, 'Address is required'),
	streetName: z.string().min(1, 'Street name is required'),
	postcode: z.string().min(3, 'Postcode is required'),
	shippingMethod: z.string().min(1, 'Shipping method is required'),

	// Payment Step
	cardName: z.string().min(1, 'Name on card is required'),
	cardNumber: z.string().regex(/^\d{4}-\d{4}-?$/, 'Invalid card format (1234-5678)'),
	expMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, 'MM'),
	expYear: z.string().regex(/^\d{2}$/, 'YY'),
	cvc: z.string().regex(/^\d{3,4}$/, 'Invalid CVC'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
