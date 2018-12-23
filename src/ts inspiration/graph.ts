import Highcharts = require('highcharts');
import {getState, setState} from './state';
import {frames} from './defaultFrames';
import {getCoinName} from './coinName';

Highcharts.setOptions({
	colors: [
		'#F9C80E',
		'#854CBA',
		'#55BF3B',
		'#ff0066',
		'#2288CC',
		'#DD3322',
		'#bb4488',
		'#99aa00',
		'#5885BC',
	],
	global: {
		useUTC: false,
	},
});

let state = getState();
let graph = Highcharts.stockChart('#', {});

export function createChart(dataSeries: object[]) {
	state = getState();

	let frame = frames[state.selectedFrame];

	graph = Highcharts.stockChart('graph', {
		title: {
			text: 'Relative development of crypto coins the ' + frame.name.toLowerCase(),
		},
		subtitle: {
			text: getSubtitle(),
		},
		rangeSelector: frame.rangeSelector,
		yAxis: {
			labels: {
				formatter: function() {
					return (this.value > 0 ? ' + ' : '') + this.value + '%';
				},
			},
			plotLines: [
				{
					value: 0,
					width: 2,
					color: 'silver',
				},
			],
		},

		plotOptions: {
			series: {
				compare: 'percent',
				showInNavigator: true,
			},
		},

		tooltip: {
			pointFormat:
				'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
			valueDecimals: 1,
			split: dataSeries.length <= 4 ? true : false,
		},

		series: dataSeries,
	});

	setState({graph});
}

function setSubtitle() {
	graph.setTitle(null, {text: getSubtitle()});
}

function getSubtitle() {
	let data: string[] = [];

	state.coins.forEach((symbol) => data.push(getCoinName(symbol)));

	if (1 < data.length) {
		data[data.length - 1] = 'and ' + data[data.length - 1];
	}

	return data.join(', ') + ' priced in ' + state.nomination;
}
