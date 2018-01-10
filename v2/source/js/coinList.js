import {setState} from './state';
import {$} from 'jquery';


export function getCoinList(){
	$.getJSON('https://min-api.cryptocompare.com/data/all/coinlist', function(res) {
		let coinlist=[];
		$.each(res.Data, function(i, coin) {
			coinlist[coin.Symbol]={
				name:coin.CoinName,	
				symbol:coin.Symbol,
				fullName:coin.FullName,	
				rank:parseInt(coin.SortOrder),
				img:coin.BaseImageUrl+coin.ImageUrl,
			};
		});

		localStorage.setItem("coinlist", JSON.stringify(coinlist));
		//console.log(coinlist.sort(dynamicSort('rank')));
		setState({coinlist}, false);
	});
}



function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}


