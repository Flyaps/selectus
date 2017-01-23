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

	var selectedItemClass = 'selectus__selected-item';
	var dropdownOpenClass = 'selectus_dropdown-open';
	var tabSelectedClass = 'selectus__tab_selected';
	var listSelectedClass = 'selectus__list_selected';
	var itemSelectedClass = 'selectus__item_selected';

	var Selectus = function () {
	   function Selectus(element, options) {
	      _classCallCheck(this, Selectus);

	      var self = this;

	      self.options = options;

	      var $element = (0, _jquery2.default)(element);

	      var $input = void 0;

	      if ($element.is('input[type="hidden"]')) {

	         $input = $element;

	         $element = (0, _jquery2.default)('<div class="selectus">' + options.mainHTML + '<div>');

	         $input.before($element);

	         $element.append($input);
	      } else {

	         $element.addClass('selectus').append(options.mainHTML);

	         $input = (0, _jquery2.default)('<input type="hidden">');

	         $element.append($input);
	      }

	      self.elements = {
	         $element: $element,
	         $window: (0, _jquery2.default)(window),
	         $selectedItems: $element.find('.selectus__selected-items'),
	         $dropdown: $element.find('.selectus__dropdown'),
	         $title: $element.find('.selectus__title'),
	         $currentType: $element.find('.selectus__current-type'),
	         $tabs: $element.find('.selectus__tabs'),
	         $lists: $element.find('.selectus__lists'),
	         $input: $input
	      };

	      var _self$elements = self.elements,
	          $dropdown = _self$elements.$dropdown,
	          $window = _self$elements.$window;


	      self.updateHTMLData();

	      // dropdown

	      $element.on('click', '.selectus__current-type', function (e) {
	         e.preventDefault();

	         if ($element.hasClass(dropdownOpenClass)) {

	            self.hideDropdown();
	         } else {

	            self.showDropdown();
	         }
	      });

	      // tabs

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

	         self.setSelectedItemsOfCurrentTab();
	      });

	      $element.on('click', '.selectus__item', function (e) {

	         var $self = (0, _jquery2.default)(e.currentTarget);

	         $self.toggleClass(itemSelectedClass);

	         if ($self.hasClass(itemSelectedClass)) {
	            self.addSelectedItem($self.data('id'), _jquery2.default.trim($self.html()));
	         } else {
	            self.removeSelectedItem($self.data('id'));
	         }
	      });

	      $element.on('click', '.selectus__selected-item-remove', function (e) {

	         setTimeout(function () {
	            var $item = (0, _jquery2.default)(e.currentTarget).parent();

	            self.removeSelectedItem($item.data('id'));
	         });
	      });

	      $window.on('transitionend webkitTransitionEnd  MSTransitionEnd', function (e) {

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

	      $window.on('click', function (e) {

	         if (!(0, _jquery2.default)(e.target).closest($element).length) {
	            console.log('hideDropdown');

	            self.hideDropdown();
	         }
	      });
	   }

	   _createClass(Selectus, [{
	      key: 'setValuesToInput',
	      value: function setValuesToInput() {
	         var _elements = this.elements,
	             $lists = _elements.$lists,
	             $input = _elements.$input;


	         var value = $lists.find('.' + listSelectedClass + ' .' + itemSelectedClass).map(function (i, el) {
	            return (0, _jquery2.default)(el).data('id');
	         }).get().join(',');

	         $input.val(value);
	      }
	   }, {
	      key: 'addSelectedItem',
	      value: function addSelectedItem(id, name) {
	         var $selectedItems = this.elements.$selectedItems;


	         if ($selectedItems.find('.' + selectedItemClass + '[data-id="' + id + '"]').length) {
	            return;
	         }

	         var $item = '<span class="selectus__selected-item" data-id="' + id + '">' + name + '<span class="selectus__selected-item-remove fa fa-times"></span></span>';

	         $selectedItems.append($item);

	         this.setValuesToInput();
	      }
	   }, {
	      key: 'removeSelectedItem',
	      value: function removeSelectedItem(id) {
	         var _elements2 = this.elements,
	             $selectedItems = _elements2.$selectedItems,
	             $lists = _elements2.$lists;


	         var $item = $selectedItems.find('.' + selectedItemClass + '[data-id="' + id + '"]');

	         if (!$item.length) {
	            return;
	         }

	         $item.remove();

	         $lists.find('.' + listSelectedClass + ' .' + itemSelectedClass + '[data-id="' + id + '"]').removeClass(itemSelectedClass);

	         this.setValuesToInput();
	      }
	   }, {
	      key: 'setSelectedItemsOfCurrentTab',
	      value: function setSelectedItemsOfCurrentTab() {

	         var self = this;

	         var _elements3 = this.elements,
	             $selectedItems = _elements3.$selectedItems,
	             $lists = _elements3.$lists;


	         $selectedItems.empty();

	         $lists.find('.' + listSelectedClass + ' .' + itemSelectedClass).each(function (i, item) {

	            var $item = (0, _jquery2.default)(item);

	            self.addSelectedItem($item.data('id'), _jquery2.default.trim($item.html()));
	         });

	         this.setValuesToInput();
	      }
	   }, {
	      key: 'showDropdown',
	      value: function showDropdown() {
	         var _elements4 = this.elements,
	             $element = _elements4.$element,
	             $dropdown = _elements4.$dropdown;


	         if ($element.hasClass(dropdownOpenClass)) {
	            return;
	         }

	         $dropdown.show();

	         $element.addClass(dropdownOpenClass);
	      }
	   }, {
	      key: 'hideDropdown',
	      value: function hideDropdown() {
	         var $element = this.elements.$element;


	         if (!$element.hasClass(dropdownOpenClass)) {
	            return;
	         }

	         $element.removeClass(dropdownOpenClass);
	      }
	   }, {
	      key: 'updateHTMLData',
	      value: function updateHTMLData() {
	         var options = this.options,
	             _elements5 = this.elements,
	             $element = _elements5.$element,
	             $title = _elements5.$title,
	             $currentType = _elements5.$currentType,
	             $tabs = _elements5.$tabs,
	             $lists = _elements5.$lists;


	         $title.html(options.typesName);

	         $currentType.html(options.data[0].name);

	         options.data.forEach(function (o, i) {

	            var $tab = (0, _jquery2.default)('<a class="selectus__tab" href>' + o.name + '</a>');

	            var $list = (0, _jquery2.default)('<div class="selectus__list" style="display: none;">\
	                             <div class="selectus__search">\
	                                <input class="selectus__search-input">\
	                             </div>\
	                             <div class="selectus__items"></div>\
	                          </div>');

	            if (i === 0) {

	               $tab.addClass('selectus__tab_selected');

	               $list.addClass('selectus__list_selected').removeAttr('style');
	            }

	            $tabs.append($tab);

	            $lists.append($list);

	            var $items = $list.find('.selectus__items');

	            o.items.forEach(function (item) {

	               $items.append('<p class="selectus__item" data-id="' + item.id + '">' + item.name + '</p>');
	            });
	         });
	      }
	   }, {
	      key: 'val',
	      value: function val() {
	         var $input = this.elements.$input;


	         return $input.val();
	      }
	   }]);

	   return Selectus;
	}();

	Selectus.defaults = {
	   offset: 100,
	   speed: 500,
	   mainHTML: '<div class="selectus__brief">\
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
	              </div>'
	};

	var pluginName = 'selectus';

	_jquery2.default.fn[pluginName] = function (option) {
	   return this.each(function (i, el) {

	      console.log(typeof option === 'undefined' ? 'undefined' : _typeof(option));

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