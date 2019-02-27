import './main.scss';
import 'Widgets/bg-animation';
import 'Widgets/parallax';
const isDev = process.env.NODE_ENV.trim() !== 'production';

import(/* webpackChunkName: "vendor" */"../../angular/vendor");
import(/* webpackChunkName: "polyfills" */"../../angular/polyfills");
import(/* webpackChunkName: "angular" */ "../../angular/main");


