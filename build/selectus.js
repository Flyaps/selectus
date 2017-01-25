(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["selectus"] = factory(require("jquery"));
	else
		root["selectus"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_13__) {
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

	var _debounce2 = __webpack_require__(1);

	var _debounce3 = _interopRequireDefault(_debounce2);

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(13);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	__webpack_require__(14);

	var selectedItemClass = 'selectus__selected-item';
	var dropdownOpenClass = 'selectus_dropdown-open';
	var tabSelectedClass = 'selectus__tab_selected';
	var listSelectedClass = 'selectus__list_selected';
	var itemSelectedClass = 'selectus__item_selected';
	var manySelectedItemsExpandClass = 'selectus_many-selected-items_expand';

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
	         $numWrap: $element.find('.selectus__num-wrap'),
	         $num: $element.find('.selectus__num'),
	         $currentType: $element.find('.selectus__current-type'),
	         $tabs: $element.find('.selectus__tabs'),
	         $lists: $element.find('.selectus__lists'),
	         $input: $input
	      };

	      var _self$elements = self.elements,
	          $window = _self$elements.$window,
	          $dropdown = _self$elements.$dropdown,
	          $currentType = _self$elements.$currentType;


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

	         $currentType.html($self.html());

	         var $list = $element.find('.selectus__list').eq(index);

	         $list.siblings().removeClass(listSelectedClass);

	         $list.show();

	         $list.height();

	         $list.addClass(listSelectedClass);

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

	         self.setNumSelectedItems();
	      });

	      $element.on('click', '.selectus__selected-item-remove', function (e) {

	         setTimeout(function () {
	            var $item = (0, _jquery2.default)(e.currentTarget).parent();

	            self.removeSelectedItem($item.data('id'));

	            self.setNumSelectedItems();
	         });
	      });

	      $element.on('click', '.selectus__expand', function (e) {

	         e.preventDefault();

	         $element.addClass(manySelectedItemsExpandClass);
	      });

	      $element.on('click', '.selectus__collapse', function (e) {

	         e.preventDefault();

	         $element.removeClass(manySelectedItemsExpandClass);
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

	            self.hideDropdown();
	         }
	      });

	      $window.on('resize', (0, _debounce3.default)(self.updateSelectedItemsWidth.bind(self), 150));
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
	      key: 'setNumSelectedItems',
	      value: function setNumSelectedItems() {
	         var _elements3 = this.elements,
	             $numWrap = _elements3.$numWrap,
	             $num = _elements3.$num,
	             $lists = _elements3.$lists;


	         var num = $lists.find('.' + listSelectedClass + ' .' + itemSelectedClass).length;

	         if (num) {

	            $num.html('' + num);

	            $numWrap.show();
	         } else {

	            $num.html('');

	            $numWrap.hide();
	         }
	      }
	   }, {
	      key: 'setSelectedItemsOfCurrentTab',
	      value: function setSelectedItemsOfCurrentTab() {

	         var self = this;

	         var _elements4 = this.elements,
	             $selectedItems = _elements4.$selectedItems,
	             $lists = _elements4.$lists;


	         $selectedItems.empty();

	         $lists.find('.' + listSelectedClass + ' .' + itemSelectedClass).each(function (i, item) {

	            var $item = (0, _jquery2.default)(item);

	            self.addSelectedItem($item.data('id'), _jquery2.default.trim($item.html()));
	         });

	         this.setValuesToInput();

	         this.setNumSelectedItems();
	      }
	   }, {
	      key: 'updateSelectedItemsWidth',
	      value: function updateSelectedItemsWidth() {
	         var _elements5 = this.elements,
	             $element = _elements5.$element,
	             $selectedItems = _elements5.$selectedItems;


	         var rightВorderSelectusPosition = $element.offset().left + $element.innerWidth();

	         var $item = $selectedItems.find('.selectus__selected-item:last-child');

	         var rightВorderSelectedLastItemPosition = $item.offset().left + $item.innerWidth() + 3;

	         if (rightВorderSelectedLastItemPosition > rightВorderSelectusPosition) {

	            $element.addClass('selectus_many-selected-items');
	         } else {

	            $element.removeClass('selectus_many-selected-items');
	         }
	      }
	   }, {
	      key: 'showDropdown',
	      value: function showDropdown() {
	         var _elements6 = this.elements,
	             $element = _elements6.$element,
	             $dropdown = _elements6.$dropdown;


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
	      key: 'addItemsToList',
	      value: function addItemsToList(items, $items) {

	         if (!items.length) {
	            return;
	         }

	         items.forEach(function (item) {

	            var additionalClass = '';

	            if (item.selected) {
	               additionalClass = ' ' + itemSelectedClass;
	            }

	            $items.append('<p class="selectus__item' + additionalClass + '" data-id="' + item.id + '">' + item.name + '</p>');
	         });
	      }
	   }, {
	      key: 'updateHTMLData',
	      value: function updateHTMLData() {

	         var self = this;

	         var options = self.options,
	             _self$elements2 = self.elements,
	             $title = _self$elements2.$title,
	             $currentType = _self$elements2.$currentType,
	             $tabs = _self$elements2.$tabs,
	             $lists = _self$elements2.$lists;


	         $title.html(options.typesName);

	         $currentType.html(options.data[0].name);

	         options.data.forEach(function (o, i) {

	            var $tab = (0, _jquery2.default)('<a class="selectus__tab" href>' + o.name + '</a>');

	            var $list = (0, _jquery2.default)('<div class="selectus__list" style="display: none;">\
	                             <div class="selectus__items"></div>\
	                          </div>');

	            if (i === 0) {

	               $tab.addClass('selectus__tab_selected');

	               $list.addClass('selectus__list_selected').removeAttr('style');
	            }

	            $tabs.append($tab);

	            $lists.append($list);

	            if (o.ajax) {
	               (function () {

	                  var $search = (0, _jquery2.default)('<div class="selectus__search">                                 <input class="selectus__search-input" placeholder="Start to type" data-url="' + o.ajax.url + '">                               </div>');

	                  $list.prepend($search);

	                  var $searchInput = $search.find('.selectus__search-input');

	                  var delay = 250;

	                  if (o.ajax.delay) {
	                     delay = parseFloat(o.delay, 10);
	                  }

	                  var $items = $list.find('.selectus__items');

	                  var keyup = (0, _debounce3.default)(function (e) {

	                     var isLetter = e.which >= 48 && e.which <= 90 || e.which === 8;

	                     if (!isLetter) {
	                        return;
	                     }

	                     var val = $searchInput.val();

	                     var data = {
	                        q: val
	                     };

	                     if (o.ajax.data) {
	                        data = o.ajax.data({
	                           term: _jquery2.default.trim($searchInput.val())
	                        });
	                     }

	                     _jquery2.default.ajax({
	                        url: $searchInput.data('url'),
	                        data: data
	                     }).then(function (data) {

	                        data = {
	                           items: [{
	                              id: 10,
	                              name: '12345677645345345',
	                              selected: true
	                           }, {
	                              id: 11,
	                              name: '12345'
	                           }, {
	                              id: 12,
	                              name: '12345'
	                           }]
	                        };

	                        if (o.ajax.processResults) {
	                           data = o.ajax.processResults(data);
	                        }

	                        self.addItemsToList(data, $items);

	                        // console.log('data', data);
	                     });
	                  }, delay);

	                  $searchInput.on('keyup', keyup);
	               })();
	            } else {

	               self.addItemsToList(o.items, $list.find('.selectus__items'));
	            }
	         });

	         self.setSelectedItemsOfCurrentTab();
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
	                    <span class="selectus__num-wrap" style="display: none;">(<span class="selectus__num"></span>):</span>\
	                 </p>\
	                 <div class="selectus__selected-items"></div>\
	                 <a class="selectus__expand" href>expand</a>\
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
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2),
	    now = __webpack_require__(3),
	    toNumber = __webpack_require__(6);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	module.exports = debounce;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(4);

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};

	module.exports = now;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(5);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2),
	    isSymbol = __webpack_require__(7);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(8),
	    isObjectLike = __webpack_require__(12);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(9),
	    getRawTag = __webpack_require__(10),
	    objectToString = __webpack_require__(11);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(4);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(9);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },
/* 14 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;