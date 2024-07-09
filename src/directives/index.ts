import { App, Directive } from "vue";

import auth from "./modules/auth";
import copy from "./modules/copy";
import debounce from "./modules/debounce";
import draggable from "./modules/draggable";
import longpress from "./modules/longpress";
import throttle from "./modules/throttle";
import waterMarker from "./modules/waterMarker";

const directivesList: { [key: string]: Directive } = {
  auth,
  copy,
  waterMarker,
  draggable,
  debounce,
  throttle,
  longpress
};

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach(key => {
      app.directive(key, directivesList[key]);
    });
  }
};

export default directives;
