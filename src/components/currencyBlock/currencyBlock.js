//import {useState, createRef} from 'react';

import './currencyBlock.css';

const CurrencyBlock = ({
	currencies,
	currentCurrency,
	blockName,
	changeCurrency,
	currentValue,
	changeNeedfulCurrencyValue,
	handleChangeBaseCurrencyValue,
	handleChangeNeedfulCurrencyValue,
	changeBaseCurrencyValue,
}) => {
	const handleSelectChangeCurrency = (evt) => {
		changeCurrency(evt.target.value);
	};

	const handleChangeValue = (evt) => {
		if (handleChangeBaseCurrencyValue) {
			handleChangeBaseCurrencyValue(evt.target.value);
			changeNeedfulCurrencyValue(evt.target.value);
		} else {
			handleChangeNeedfulCurrencyValue(evt.target.value);
			changeBaseCurrencyValue(evt.target.value);
		}
	};

	return (
		<div className='currencyBlock'>
			<p className='currencyBlock__title'>{blockName}</p>
			<div className='currencyBlock__inputs-container'>
				<input
					type='number'
					min={0}
					value={currentValue}
					onChange={handleChangeValue}
					className='currencyBlock__input'
				/>
				<select
					value={currentCurrency}
					onChange={handleSelectChangeCurrency}
					className='currencyBlock__select'
				>
					{currencies.map((currency, i) => (
						<option key={i} value={currency}>
							{currency}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default CurrencyBlock;
