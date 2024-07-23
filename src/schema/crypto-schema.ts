import { z } from 'zod';

export const CurrencySchema = z.object({
	code: z.string(),
	name: z.string(),
});

export const CryptoCurrencyResponseSchema = z.object({
	CoinInfo: z.object({
		Id: z.string(),
		FullName: z.string(),
		Name: z.string(),
	}),
});

export const CryptoCurrenciesResponseSchema = z.array(
	CryptoCurrencyResponseSchema
);

export const PairSchema = z.object({
	currency: z.string(),
	cryptocurrency: z.string(),
});
