import {rute} from './navigation';

import {createChart} from './graph';

import {setState} from './state';

import '../style/style.scss';

import './about';

import './coinList';

// Todo:
// https://min-api.cryptocompare.com/data/all/coinlist
// http://jsfiddle.net/trekvnc2/
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sidenav
// https://purecss.io
// https://github.com/toomuchdesign/offside - insert link to cryptocompare

setState({
	nomination: 'USD',
	coins: ['BTC', 'BCH', 'EOS', 'ETH', 'IOT', 'XRP', 'LTC'],
	selectedFrame: 'hours',
	defaultFrame: 'hours',
	coinlist: JSON.parse(localStorage.getItem("coinlist") || '{}'),
});

rute.resolve();



// var graph = createChart(seriesOptions, coins, nomination, coinlist);

// createChart(seriesOptions, state);










