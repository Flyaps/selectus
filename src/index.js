import $ from 'jquery';

(function (root, factory) {
   if (typeof exports === 'object' && typeof module === 'object')
      module.exports = factory();
   else if (typeof define === 'function' && define.amd)
      define("library", [], factory);
   else if (typeof exports === 'object')
      exports["library"] = factory();
   else
      root["library"] = factory();
})(this, function () {
   return function (modules) {


   }
});


let plugin = (pluginName, className, shortHand = false) => {
   let dataName = `__${pluginName}`;
   let old = $.fn[pluginName];

   $.fn[pluginName] = function (option) {
      return this.each(function () {
         let $this = $(this);
         let data = $this.data(dataName);
         let options = $.extend({}, className.DEFAULTS, $this.data(), typeof option === 'object' && option);

         if (!data) {
            $this.data(dataName, (data = new className(this, options)));
         }

         if (typeof option === 'string') {
            data[option]();
         }
      });
   };

   // - Short hand
   if (shortHand) {
      $[pluginName] = (options) => $({})[pluginName](options);
   }

   // - No conflict
   $.fn[pluginName].noConflict = () => $.fn[pluginName] = old;
}

class Select3 {
   constructor(element, options) {
      const $element = $(element);

      $(window).scroll(function () {
         if ($(this).scrollTop() > options.offset) {
            $element.fadeIn();
         } else {
            $element.fadeOut();
         }
      });

      $element.click(function (e) {
         e.preventDefault();

         $('html, body').animate({
            scrollTop: 0
         }, options.speed);
      });
   }
}

Select3.DEFAULTS = {
   offset: 100,
   speed: 500,
};

plugin('ScrollToTop', ScrollToTop);


/**
 * Generate a jQuery plugin
 * @param pluginName [string] Plugin name
 * @param className [object] Class of the plugin
 * @param shortHand [bool] Generate a shorthand as $.pluginName
 *
 * @example
 * import plugin from 'plugin';
 *
 * class MyPlugin {
 *     constructor(element, options) {
 *         // ...
 *     }
 * }
 *
 * MyPlugin.DEFAULTS = {};
 *
 * plugin('myPlugin', MyPlugin');
 */




plugin('select3', Select3);