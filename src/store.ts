import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getCryptos } from './services/CryptoService';
import { CryptoCurrency } from './types';

type CryptoStore = {
	cryptoCurrencies: CryptoCurrency[];
	fetchCryptos: () => Promise<void>;
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
	}))
);
