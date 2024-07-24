import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchCurrentCryptoPrice, getCryptos } from './services/CryptoService';
import { CryptoCurrency, CryptoPriceSchema, PairCurrency } from './types';

type CryptoStore = {
	cryptoCurrencies: CryptoCurrency[];
	result: CryptoPriceSchema;
	loading: boolean;
	fetchCryptos: () => Promise<void>;
	fetchData: (pair: PairCurrency) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>()(
	devtools((set) => ({
		cryptoCurrencies: [],
		result: {
			IMAGEURL: '',
			LASTUPDATE: '',
			PRICE: '',
			HIGHDAY: '',
			LOWDAY: '',
			CHANGEPCT24HOUR: '',
		},
		loading: false,
		fetchCryptos: async () => {
			const cryptoCurrencies = await getCryptos();

			set(() => ({
				cryptoCurrencies,
			}));
		},
		fetchData: async (pair) => {
			set(() => ({
				loading: true,
			}));

			const result = await fetchCurrentCryptoPrice(pair);
			set(() => ({
				result,
				loading: false,
			}));
		},
	}))
);
