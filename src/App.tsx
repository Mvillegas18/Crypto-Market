import { useEffect } from 'react';
import CryptoSearchForm from './components/CryptoSearchForm';
import { useCryptoStore } from './store';

export default function App() {
	const { fetchCryptos } = useCryptoStore();

	useEffect(() => {
		fetchCryptos();
	}, []);

	return (
		<div className='container'>
			<h1 className='app-title'>
				Cotizador de <span>Cryptomonedas</span>
			</h1>

			<div className='content'>
				<CryptoSearchForm />
			</div>
		</div>
	);
}

