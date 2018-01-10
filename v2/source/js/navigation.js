import {$} from 'jquery';
import {Navigo} from 'navigo';
import {setState, getState} from './state';
import {default as go} from 'pubsubway';
import {createChart} from './graph';
import {fetchCoinData} from './fetchCoinData'

Navigo.MATCH_REGEXP_FLAGS = 'i';

export function gotoState(avoidAction){
	let state = getState();
	$('#graph').fadeOut();
	rute.navigate(`${state.coins.join('-')}/in/${state.nomination}/recent/${state.selectedFrame}`.toLowerCase());
}
go.when('state/updated', gotoState);

let state = getState();
export let rute = new Navigo(null, true, '#!');
rute
	.on(gotoState)
	.on('/:coins/in/:nomination/recent/:scale', async (input)=>{
		setState({
			coins: input.coins.replace(/^-|-$/, '').toUpperCase().split('-'),
			nomination: input.nomination.toUpperCase(),
			frame: frames[input.scale.toLowerCase()] || frames[state.defaultFrame],
		})
		let graph = createChart(await fetchCoinData());
		setState({graph});
		$('#graph').fadeIn();		
	})
	.on('/hours', function () {
		setState({selectedFrame: 'hours'}, true);
	})	
	.on('/weeks', function () {
		setState({selectedFrame: 'weeks'}, true);
	})	
	.on('/years', function () {
		setState({selectedFrame: 'years'}, true);
	})



