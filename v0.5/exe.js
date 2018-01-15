/*
/
/	Warning!
/
/	This file contains 1999-era javascript code structures. 
/
/	If it hurts your eyes pleas make a PR:
/
/	github.com/mathiasrw/cryptofiddle
/
*/

// Todo:
// https://min-api.cryptocompare.com/data/all/coinlist
// http://jsfiddle.net/trekvnc2/
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sidenav
// https://purecss.io
// https://github.com/toomuchdesign/offside - insert link to cryptocompare

Highcharts = require('highcharts/highstock');
Navigo = require('navigo');
$ = require('jquery');
alasql = require('alasql');

var
	coins = ['BTC', 'ETH', 'LTC', 'DASH'],
	nomination = 'USD',
	seriesOptions = [],
	seriesCounter = 0,
	defaultFrame = 'hours',
	coinlist = JSON.parse(localStorage.getItem("coinlist")||'{}');


// few
coins = ['BTC', 'BCH', 'EOS', 'ETH', 'IOT', 'XRP', 'LTC'];

Qcoins = ['BTC'];

// many
Qcoins = ['BTC', 'BCH', 'EOS', 'ETH', 'IOT', 'XRP', 'LTC', 'ZEC', 'NEO', 'DASH', 'XMR'];

// Crazy
Qcoins = ['MONA', 'ZEN','SKY','ARDR', 'MCO'];
Qcoins = ['REP','ARK','STEEM','LSK'];
qcoins = ['DCR','SALT','SC','CVC','ZRX'];
Qcoins = ['ANT','ENG','SNM','DMD', 'YYW'];
Qcoins = ['SHIFT','CRW','SLT','SWT','PURA'];








intervals = {
				"1h": {
						type: 'hour',
						count: 1,
						text: '1h'
					}, 
				"6h": {
						type: 'hour',
						count: 6,
						text: '6h'
					}, 

				"24h": {
						type: 'hour',
						count: 24,
						text: '24h'
					}, 

				"7d":	{
						type: 'day',
						count: 7,
						text: '7d'
					}, 
				"30d": {
						type: 'day',
						count: 30,
						text: '30d'
					},
				"6m": {
						type: 'month',
						count: 6,
						text: '6m'
					},
				"1y":{
						type: 'year',
						count: 1,
						text: '1y'
						}, 
				"2y":{
						type: 'year',
						count: 2,
						text: '2y'
					}, 
				"3y":{
						type: 'year',
						count: 3,
						text: '3y'
						}, 
				"ytd": {
						type: 'ytd',
						text: 'YTD'
                 },
                 "all":{
						type: 'all',
						text: 'All'
				}
};


frames={
	"hours":{
		name: "Last few hours",
		urlpath: '/data/histominute',
		rangeSelector: {
			buttons: [intervals.all, intervals["24h"], intervals["6h"], intervals["1h"]],
			selected: 0,
		}
	},
	"weeks":{
		name: "Last few weeks",
		urlpath: '/data/histohour',
		rangeSelector: {
			buttons: [intervals.all, intervals["30d"], intervals["7d"], intervals["24h"]],
			selected: 0,
		}
	},
	"years":{
		name: "Last few years",
		urlpath: '/data/histoday',
		rangeSelector: {
			buttons: [intervals.all, intervals["ytd"],  intervals["3y"],  intervals["1y"], intervals["6m"]],
			selected: 0,
		}
	}
};

var frame = frames[defaultFrame];

Navigo.MATCH_REGEXP_FLAGS = 'i';

var rute = new Navigo(null, true, '#!');
rute
	.on(gotoState)
	.on('/:coins/in/:nomination/recent/:scale', function (input) {
		coins = input.coins.replace(/^-|-$/, '').toUpperCase().split('-');
		nomination = input.nomination.toUpperCase();
		frame = frames[input.scale.toLowerCase()] || frames[defaultFrame];
		seriesOptions = [],
		seriesCounter = 0,
		fetch(function(){$('#graph').fadeIn()});		
	})
	.on('/hours', function () {
		defaultFrame = 'hours';
		gotoState();
	})	
	.on('/weeks', function () {
		defaultFrame = 'weeks';
		gotoState();
	})	
	.on('/years', function () {
		defaultFrame = 'years';
		gotoState();
	})

.resolve();


function prevent(event){
	event.preventDefault();
    event.stopPropagation();
}

$('.open-about').click(function(event){
	document.getElementById("modal-about").style.width = "400px";
	prevent(event)
})


$('.close-about').click(function(event){
	document.getElementById("modal-about").style.width = "0px";
	prevent(event)
});	

function gotoState(avoidAction){
	$('#graph').fadeOut();
	rute.navigate(['',coins.join('-'), 'in' , nomination, 'recent' , defaultFrame].join('/').toLowerCase());
}


function fetch(cb){
	$.each(coins, function(i, symbol) {
			$.getJSON('https://min-api.cryptocompare.com'+frame.urlpath+'?fsym=' + symbol.toUpperCase() + '&tsym=' + nomination.toUpperCase() + '&limit=2000&aggregate=1', function(data) {
				seriesOptions[i] = {
					name: getName(symbol, true),
					data: alasql("MATRIX OF SELECT `time`*1000, `close` FROM ?", [data.Data])
				};

				seriesCounter += 1;

				if (seriesCounter === coins.length) {
					createChart(seriesOptions, coins, nomination);
					if(cb){
						cb();
					}
				}
			});


		});
}

var graph = {};


function createChart(seriesOptions, coins, nomination) {

		graph = Highcharts.stockChart('graph', {
			title: {
				text: 'Relative development of crypto coins the ' + frame.name.toLowerCase()
			},
			subtitle: {
				text: getSubtitle()
			},
			rangeSelector: frame.rangeSelector,
			yAxis: {
				labels: {
					formatter: function() {
						return (this.value > 0 ? ' + ' : '') + this.value + '%';
					}
				},
				plotLines: [{
					value: 0,
					width: 2,
					color: 'silver'
				}]
			},

			plotOptions: {
				series: {
					compare: 'percent',
					showInNavigator: true
				}
			},

			tooltip: {
				pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
				valueDecimals: 1,
				split: seriesOptions.length<=4?true:false,
			},

			series: seriesOptions
		});
	
}





Highcharts.setOptions({
	"colors": ['#F9C80E', '#854CBA', '#55BF3B', '#ff0066', '#2288CC', '#DD3322', '#bb4488', '#99aa00', '#5885BC'],
	global: {
        useUTC: false,
    }
});


function setSubtitle(){
	graph.setTitle(null, { text: getSubtitle()});
}

function getSubtitle(){
	data = [];
	$.each(coins, function(i, symbol){
		var msg = symbol;
		if(coinlist[symbol]){
			msg = coinlist[symbol].name;
		}
		data.push(msg);
	});
	
	if(1<data.length){
		data[data.length-1] = 'and '+data[data.length-1];
	}

	return data.join(', ') + ' priced in ' + nomination;

}

function getName(symbol, full){
	if(!coinlist[symbol]){
		return symbol;
	}
	if(full){
		return coinlist[symbol].fullName;
	}
	return coinlist[symbol].name;
}



	

$.getJSON('https://min-api.cryptocompare.com/data/all/coinlist', function(res) {
		console.log(res.Data['BCH']);

	$.each(res.Data, function(i, coin) {
		coinlist[coin.Symbol]={
			name:coin.CoinName,	
			symbol:coin.Symbol,
			fullName:coin.FullName,	
			rank:parseInt(coin.SortOrder),
			img:coinlist.BaseImageUrl+coin.ImageUrl,
		};
	});

	localStorage.setItem("coinlist", JSON.stringify(coinlist));
	//console.log(coinlist.sort(dynamicSort('rank')));
});



function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


