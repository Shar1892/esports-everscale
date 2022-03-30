const randomInteger = (min, max) => {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
};

export const getCurrenciesToChenge = (currenciesArr) => {
	let baseCurrency = currenciesArr[randomInteger(0, currenciesArr.length - 1)];
	let needfulCurrency =
		currenciesArr[randomInteger(0, currenciesArr.length - 1)];

	while (needfulCurrency === baseCurrency) {
		needfulCurrency = currenciesArr[randomInteger(0, currenciesArr.length - 1)];
	}

	return [baseCurrency, needfulCurrency];
};
