import { useState } from 'react';
import { currencies } from '../data';
import { useCryptoStore } from '../store';
import { PairCurrency } from '../types';
import ErrorMessage from './ErrorMessage';

export default function CryptoSearchForm() {
	const { cryptoCurrencies, fetchData } = useCryptoStore();
	const [pair, setPair] = useState<PairCurrency>({
		currency: '',
		cryptocurrency: '',
	});

	const [error, setError] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (Object.values(pair).includes('')) {
			setError('Todos los campos son obligatorios');
			return;
		}
		setError('');

		// Consultar la api
		fetchData(pair);
	};

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPair({
			...pair,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<form
			className='form'
			onSubmit={handleSubmit}>
			{error && <ErrorMessage>{error}</ErrorMessage>}

			<div className='field'>
				<label htmlFor='currency'>Moneda:</label>
				<select
					name='currency'
					id='currency'
					onChange={handleChange}
					value={pair.currency}>
					<option value=''>-- Seleccione --</option>
					{currencies.map((currency) => (
						<option
							value={currency.code}
							key={currency.code}>
							{currency.name}
						</option>
					))}
				</select>
			</div>

			<div className='field'>
				<label htmlFor='cryptocurrency'>Cryptomoneda:</label>
				<select
					name='cryptocurrency'
					id='cryptocurrency'
					onChange={handleChange}
					value={pair.cryptocurrency}>
					<option value=''>-- Seleccione --</option>
					{cryptoCurrencies.map(({ CoinInfo }) => (
						<option
							key={CoinInfo.Id}
							value={CoinInfo.Name}>
							{CoinInfo.FullName}
						</option>
					))}
				</select>
			</div>

			<input
				type='submit'
				value='Cotizar'
			/>
		</form>
	);
}
