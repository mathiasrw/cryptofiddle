import Highcharts = require('highcharts/highstock');
import Navigo = require('navigo');
import $ = require('jquery');
import alasql = require('alasql');

// import './style/style.css';

export default class Main {
	constructor() {
		console.log('abccc Typescript Webpack starter launched');
		$('#graph').fadeIn();
	}
}

let start = new Main();
