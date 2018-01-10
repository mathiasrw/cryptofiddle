// Application Dependencies

import 'alasql';
import go = require('pubsubway');
import Navigo = require('navigo');

declare global {
    var alasql: typeof alasql;
    var go: any;
    var Navigo: any;
}
