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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	__webpack_require__(2);

	console.log('$', _jquery2.default);

	var plugin = function plugin(pluginName, className) {
	   var shortHand = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	   var dataName = '__' + pluginName;
	   var old = _jquery2.default.fn[pluginName];

	   _jquery2.default.fn[pluginName] = function (option) {
	      return this.each(function () {
	         var $this = (0, _jquery2.default)(this);
	         var data = $this.data(dataName);
	         var options = _jquery2.default.extend({}, className.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && option);

	         if (!data) {
	            $this.data(dataName, data = new className(this, options));
	         }

	         if (typeof option === 'string') {
	            data[option]();
	         }
	      });
	   };

	   // - Short hand
	   if (shortHand) {
	      _jquery2.default[pluginName] = function (options) {
	         return (0, _jquery2.default)({})[pluginName](options);
	      };
	   }

	   // - No conflict
	   _jquery2.default.fn[pluginName].noConflict = function () {
	      return _jquery2.default.fn[pluginName] = old;
	   };
	};

	var Selectus = function () {
	   function Selectus(element, options) {
	      _classCallCheck(this, Selectus);

	      var $element = (0, _jquery2.default)(element);

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

	Selectus.DEFAULTS = {
	   offset: 100,
	   speed: 500
	};

	plugin('selectus', Selectus);

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