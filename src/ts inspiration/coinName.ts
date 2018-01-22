import { getState } from './state';


export function getCoinName(symbol: string, full = false) {
	const state = getState();
	if (!state.coinlist[symbol]) {
		return symbol;
	}
	if (full) {
		return state.coinlist[symbol].fullName;
	}
	return state.coinlist[symbol].name;
}