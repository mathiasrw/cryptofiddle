import {r2} from 'r2';
import {frames} from './defaultFrames';
import {default as alasql} from 'alasql';
import {getCoinName} from './coinName';
import {getState} from './state';


export async function fetchCoinData(coins=[]){			 // jshintQQQ ignore:line
	let state = getState();

	if(!coins.length){
		coins=state.coins;
	}
		
	let dataSeries = [];

	let frame = frames[state.selectedFrame];

	let asyncFlow = [];

	for (let i of coins) {
		let symbol=coins[i];
		let url = `https://min-api.cryptocompare.com${frame.urlpath}?fsym=${symbol.toUpperCase()}&tsym=${state.nomination.toUpperCase()}&limit=2000&aggregate=1`;
		asyncFlow.push(r2.get(url).json.then((data)=>{
			dataSeries[i] = {
					name: getCoinName(symbol, true),
					data: alasql("MATRIX OF SELECT `time`*1000, `close` FROM ?", [data.Data])
				};
		})); 
	}
	
	await Promise.all(asyncFlow);
	return dataSeries;


}


