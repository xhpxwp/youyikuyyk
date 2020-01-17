import "jquery";

import '../stylesheets/index.css';
import '../stylesheets/login.css';
import '../stylesheets/cartlist.css';
import '../stylesheets/datails.css';
import '../stylesheets/dressindex.css';
import {
    Louti
} from './louti.js';



import {
    Tabs
} from './tab.js';


import {
   Details
} from './details.js';
 
import{
    render
}
from'./dress.js'


new Louti().init()
new Tabs().init()
// new Details().init()
new  Render().init()
