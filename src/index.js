require('./main.styl');

import $ from 'jquery';

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

      $('body').on('click', function () {
         console.log(12345);
      });

   }

   static staticMethod() {
      return 'staticMethod';
   }

   prototypeMethod() {
      return 'prototypeMethod';
   }

}

Select3.DEFAULTS = {
   offset: 100,
   speed: 500,
};

plugin('select3', Select3);

export default Select3;