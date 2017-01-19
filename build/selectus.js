(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["selectus"] = factory(require("jquery"));
	else
		root["selectus"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	__webpack_require__(2);

	var Selectus = function () {
	   function Selectus(element, options) {
	      _classCallCheck(this, Selectus);

	      var $element = (0, _jquery2.default)(element);

	      $element.append(options.mainHTML);

	      // dropdown

	      var $dropdown = (0, _jquery2.default)('.selectus__dropdown');

	      var dropdownOpenClass = 'selectus_dropdown-open';

	      $element.on('click', '.selectus__current-type', function (e) {
	         e.preventDefault();

	         if (!$element.hasClass(dropdownOpenClass)) {
	            $dropdown.show();
	         }

	         $element.toggleClass(dropdownOpenClass);
	      });

	      // tabs

	      var tabSelectedClass = 'selectus__tab_selected';
	      var listSelectedClass = 'selectus__list_selected';

	      $element.on('click', '.selectus__tab', function (e) {

	         e.preventDefault();

	         var $self = (0, _jquery2.default)(e.target);

	         if ($self.hasClass(tabSelectedClass)) {
	            return;
	         }

	         $self.addClass(tabSelectedClass).siblings().removeClass(tabSelectedClass);

	         var index = $self.index();

	         var $currentList = $element.find('.selectus__list').eq(index);

	         $currentList.siblings().removeClass(listSelectedClass);

	         $currentList.show();

	         $currentList.height();

	         $currentList.addClass(listSelectedClass);
	      });

	      (0, _jquery2.default)(document).on('transitionend webkitTransitionEnd  MSTransitionEnd', function (e) {

	         var $self = (0, _jquery2.default)(e.target);

	         // dropdown

	         if ($self.is($dropdown)) {
	            if (!$element.hasClass(dropdownOpenClass)) {
	               $self.hide();
	            }
	         }

	         // tabs
	         if ($self.is('.selectus__list')) {
	            if (!$self.hasClass(listSelectedClass)) {
	               $self.hide();
	            }
	         }
	      });
	   }

	   _createClass(Selectus, [{
	      key: 'prototypeMethod',
	      value: function prototypeMethod() {
	         return 'prototypeMethod';
	      }
	   }], [{
	      key: 'staticMethod',
	      value: function staticMethod() {
	         return 'staticMethod';
	      }
	   }]);

	   return Selectus;
	}();

	Selectus.defaults = {
	   offset: 100,
	   speed: 500,
	   mainHTML: '<div class="selectus">\
	                 <div class="selectus__brief">\
	                    <p class="selectus__current">\
	                       <a href class="selectus__current-type"></a>\
	                       <span class="selectus__num-wrap">(<span class="selectus__num"></span>):</span>\
	                    </p>\
	                    <div class="selectus__selected-items"></div>\
	                    <a class="selectus__more" href></a>\
	                    <a class="selectus__collapse" href>collapse</a>\
	                 </div>\
	                 <div class="selectus__dropdown">\
	                    <div class="selectus__head">\
	                       <h3 class="selectus__title"></h3>\
	                       <div class="selectus__tabs"></div>\
	                    </div>\
	                    <div class="selectus__lists"></div>\
	                 </div>\
	             </div>'
	};

	var pluginName = 'selectus';

	_jquery2.default.fn[pluginName] = function (option) {
	   var _arguments = arguments;

	   return this.each(function (i, el) {

	      console.log(_arguments);

	      var $this = (0, _jquery2.default)(el);
	      var data = $this.data('__' + pluginName);

	      if (!data) {
	         var options = _jquery2.default.extend({}, _jquery2.default.fn[pluginName].defaults, (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && option);

	         $this.data('__' + pluginName, data = new Selectus(el, options));
	      }

	      if (typeof option === 'string') {
	         data[option]();
	      }
	   });
	};

	_jquery2.default.fn[pluginName].defaults = Selectus.defaults;

	// - No conflict
	_jquery2.default.fn[pluginName].noConflict = function () {
	   return _jquery2.default.fn[pluginName] = old;
	};

	exports.default = Selectus;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;