import * as go from 'pubsubway';
import * as $ from 'jquery';
import * as Highcharts from 'highcharts/highstock';


const state = {
	nomination: '',
	coins: [''],
	selectedFrame: '',
	coinlist: {},
	defaultFrame: '',
	graph: Highcharts.stockChart('#', {}),
};

export function getState(){
	return state;
}

export function setState(data: object, publishUpdatedState = true){
	$.extend(state, data);
	if (publishUpdatedState){
		go.yell('state/updated');
	}
	return state;
}
