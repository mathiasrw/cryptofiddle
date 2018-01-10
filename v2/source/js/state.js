import {default as go} from 'pubsubway';
import {$} from 'jquery';
import {Highcharts} from 'highcharts/highstock';


const state = {
	nomination: '',
	coins: [],
	selectedFrame: '',
	coinlist: {},
	defaultFrame: '',
	graph: Highcharts.stockChart('#',{}),
};

export function getState(){
	return state;
}

export function setState(data, publishUpdatedState=true){
	$.extend(state,data);
	if(publishUpdatedState){
		go.yell('state/updated');
	}
	return state;
}
