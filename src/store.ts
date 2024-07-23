import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchCurrentCryptoPrice, getCryptos } from './services/CryptoService';
import { CryptoCurrency, PairCurrency } from './types';

type CryptoStore = {
	cryptoCurrencies: CryptoCurrency[];
	fetchCryptos: () => Promise<void>;
	fetchData: (pair: PairCurrency) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>()(
	devtools((set) => ({
		cryptoCurrencies: [],
		fetchCryptos: async () => {
			const cryptoCurrencies = await getCryptos();

			set(() => ({
				cryptoCurrencies,
			}));
		},
		fetchData: async (pair) => {
			await fetchCurrentCryptoPrice(pair);
		},
	}))
);
