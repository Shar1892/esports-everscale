import {BASE_URL} from './constants';

export const getCurrencies = () => {
	return fetch(`${BASE_URL}currencies?apiKey=3bb27abed474a1294564`, {
		mode: 'cors',
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'text/plain',
		},
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((data) => data);
};

export const getExchangeRate = (baseCurrency, needfulCurrency) => {
	return fetch(
		`${BASE_URL}convert?q=${baseCurrency}_${needfulCurrency}&compact=ultra&apiKey=3bb27abed474a1294564`,
		{
			mode: 'cors',
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'text/plain',
			},
		}
	)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((data) => data);
};
