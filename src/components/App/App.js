import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import './App.css';

import * as currconvApi from '../../utils/currconvApi';
import {getCurrenciesToChenge} from '../../utils/utils';

import CurrencyBlock from '../currencyBlock/currencyBlock';

function App() {
	const [currencies, setCurrencies] = useState([]);
	const [baseCurrency, setBaseCurrency] = useState('');
	const [needfulCurrency, setNeedfulCurrency] = useState('');

	const [baseCurrencyValue, setBaseCurrencyValue] = useState(0);
	const [needfulCurrencyValue, setNeedfulCurrencyValue] = useState(0);

	const [exchangeRate, setExchangeRate] = useState(0);

	const [language, setLanguage] = useState('en');

	const {t, i18n} = useTranslation();

	const changeLanguage = (language) => {
		i18n.changeLanguage(language);
	};

	const handleChangeLanguage = () => {
		if (language === 'en') {
			changeLanguage('ru');
			setLanguage('ru');
		} else {
			changeLanguage('en');
			setLanguage('en');
		}
	};

	const getCurrencies = () => {
		currconvApi
			.getCurrencies()
			.then((currenciesList) => {
				let currenciesArr = Object.keys(currenciesList.results);
				setCurrencies(currenciesArr);

				let currenciesToChenge = getCurrenciesToChenge(currenciesArr);
				setBaseCurrency(currenciesToChenge[0]);
				setNeedfulCurrency(currenciesToChenge[1]);

				getRate(currenciesToChenge[0], currenciesToChenge[1]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getRate = (baseCurrencyValue, needfulCurrencyValue) => {
		currconvApi
			.getExchangeRate(baseCurrencyValue, needfulCurrencyValue)
			.then((data) => {
				setExchangeRate(Object.values(data)[0]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getCurrencies();
	}, []);

	const changeBaseCurrency = (newCurrency) => {
		setBaseCurrency(newCurrency);
		getRate(newCurrency, needfulCurrency);
		setBaseCurrencyValue(0);
		setNeedfulCurrencyValue(0);
	};

	const changeNeedfulCurrency = (newCurrency) => {
		setNeedfulCurrency(newCurrency);
		getRate(baseCurrency, newCurrency);
		setBaseCurrencyValue(0);
		setNeedfulCurrencyValue(0);
	};

	const changeNeedfulCurrencyValue = (newBaseCurrencyValue) => {
		setNeedfulCurrencyValue(newBaseCurrencyValue * exchangeRate);
	};

	const handleChangeNeedfulCurrencyValue = (newValue) => {
		setNeedfulCurrencyValue(newValue);
	};

	const changeBaseCurrencyValue = (newNeedfulCurrencyValue) => {
		setBaseCurrencyValue(newNeedfulCurrencyValue / exchangeRate);
	};

	const handleChangeBaseCurrencyValue = (newValue) => {
		setBaseCurrencyValue(newValue);
	};

	return (
		<div className='App'>
			<button onClick={handleChangeLanguage} className='App__button'>
				{t('chang language')}
			</button>
			<CurrencyBlock
				currencies={currencies}
				currentCurrency={baseCurrency}
				changeCurrency={changeBaseCurrency}
				blockName={t('changing')}
				currentValue={baseCurrencyValue}
				changeNeedfulCurrencyValue={changeNeedfulCurrencyValue}
				handleChangeBaseCurrencyValue={handleChangeBaseCurrencyValue}
			/>
			<CurrencyBlock
				currencies={currencies}
				currentCurrency={needfulCurrency}
				changeCurrency={changeNeedfulCurrency}
				blockName={t('getting')}
				currentValue={needfulCurrencyValue}
				handleChangeNeedfulCurrencyValue={handleChangeNeedfulCurrencyValue}
				changeBaseCurrencyValue={changeBaseCurrencyValue}
			/>
		</div>
	);
}

export default App;
