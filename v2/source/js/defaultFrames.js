import intervals from './defaultIntervals';

export const frames={
	"hours":{
		name: "Last few hours",
		urlpath: '/data/histominute',
		rangeSelector: {
			buttons: [intervals['all'], intervals["24h"], intervals["6h"], intervals["1h"]],
			selected: 0,
		}
	},
	"weeks":{
		name: "Last few weeks",
		urlpath: '/data/histohour',
		rangeSelector: {
			buttons: [intervals['all'], intervals["30d"], intervals["7d"], intervals["24h"]],
			selected: 0,
		}
	},
	"years":{
		name: "Last few years",
		urlpath: '/data/histoday',
		rangeSelector: {
			buttons: [intervals['all'], intervals["ytd"],  intervals["3y"],  intervals["1y"], intervals["6m"]],
			selected: 0,
		}
	}
};