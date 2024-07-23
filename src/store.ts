import axios from 'axios';
import { create } from 'zustand';
import { CryptoCurrenciesResponseSchema } from './schema/crypto-schema';
import { CryptoCurrency } from './types';

type CryptoStore = {
	cryptoCurrencies: CryptoCurrency[];
	fetchCryptos: () => Promise<void>;
};

async function getCryptos() {
	const url =
		'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD';

	const {
		data: { Data },
	} = await axios(url);

	const result = CryptoCurrenciesResponseSchema.safeParse(Data);

	if (result.success) {
		return result.data;
	}
}

export const useCryptoStore = create<CryptoStore>((set) => ({
	cryptoCurrencies: [],
	fetchCryptos: async () => {
		const cryptoCurrencies = await getCryptos();

		set(() => ({
			cryptoCurrencies,
		}));
	},
}));
