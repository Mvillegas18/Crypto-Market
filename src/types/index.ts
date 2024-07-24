import { z } from 'zod';
import {
	CryptoCurrencyResponseSchema,
	CryptoPriceSchema,
	CurrencySchema,
	PairSchema,
} from '../schema/crypto-schema';

export type Currency = z.infer<typeof CurrencySchema>;

export type CryptoCurrency = z.infer<typeof CryptoCurrencyResponseSchema>;

export type PairCurrency = z.infer<typeof PairSchema>;

export type CryptoPriceSchema = z.infer<typeof CryptoPriceSchema>;
