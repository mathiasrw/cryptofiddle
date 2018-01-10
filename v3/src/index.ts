import * as $ from 'jquery';
import './style/style.css';

export default class Main {
    constructor() {
        console.log('abccc Typescript Webpack starter launched');
        $('#graph').fadeIn();
    }
}

let start = new Main();