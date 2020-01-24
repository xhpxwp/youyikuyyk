import "jquery";

import '../stylesheets/index.css';
import '../stylesheets/login.css';
import '../stylesheets/cartlist.css';
import '../stylesheets/datails.css';
import '../stylesheets/dressindex.css';
import '../stylesheets/registry.css';

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
  Render
}
from'./dress.js'

import{
  Cartlist
}
from'./cartlist.js'


import{
 Login
}
from'./login.js'

import{
  Registry
 }
 from'./registry.js'

new Louti().init()
new Tabs().init()
new Details().init()
new  Render().init()
new Cartlist().init()
new Login().init()
new  Registry().init()
